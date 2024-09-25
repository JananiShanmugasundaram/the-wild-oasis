import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryclient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabinMutation } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: "cabins" });
      toast.success("cabin successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteCabinMutation };
}
