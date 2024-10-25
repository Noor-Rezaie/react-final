import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

// THIS CAN FETCH  THE DATA FROM THE DATABASE
export function useBooking() {
  //
  // THIS CAN CATCH THE DATA FROM TEH {URL} !
  const { bookingId } = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
}
