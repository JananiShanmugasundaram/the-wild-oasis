import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
function useDeleteBooking() {
  const queryclient = useQueryClient();
  const {
    mutate: deleteDataFn,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: "bookings" });
      toast.success(`Succedfully deleted the cabin.`);
    },
    onError: () => toast.error(`There was problem in deleting the cabin.`),
  });
  return { deleteDataFn, isDeleting, error };
}

export default useDeleteBooking;
