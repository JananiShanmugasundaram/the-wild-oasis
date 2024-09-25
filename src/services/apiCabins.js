import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image?.name}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  const { data, error } = await query.select();

  if (error) throw new Error("Cabin could not be created");
  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", newCabin.data.id);
      toast.error("Cabin was not created");
      throw new Error("Cabin was not created.");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin cannot be deleted");
  }
  return null;
}
