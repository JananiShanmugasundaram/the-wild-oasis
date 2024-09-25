import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: ischeckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} was successfully checked out.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () =>
      toast.error(`There was problem in checking out the customer.`),
  });

  return { checkout, ischeckingout };
}

export default useCheckout;
