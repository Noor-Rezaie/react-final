import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  // FETCHING OR ACCESSING THE QueryClient IN TEH BELOW.
  const queryClinet = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),

    onSuccess: () => {
      toast.success("The booking has been deleted sucessfully!😍");

      queryClinet.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => toast.error(err.message),

    // THE SAME WORK THE ABOVE DOES.
    // mutationFn: deleteBooking,
  });

  return { isDeleteing, deleteBooking };
}
