import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newEditCabin, id }) => createEditCabin(newEditCabin, id),
    onSuccess: () => {
      toast.success("cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editMutate, isEditing };
}
