import supabase from "../services/superbase";
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return null;
}

export async function updateUserDataOrPassword({ fullName, password, avatar }) {
  let updatedData;
  if (fullName) updatedData = { data: { fullName } };
  if (password) updatedData = { password };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${fullName}-${data.user.id}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  const { data: avatarData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://elmmngoebcmzihkwolvg.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);

  return avatarData;
}
