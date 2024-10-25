import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // filtering the bookings
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,

          // SECOND EDITION OF THEM
          // field: "totalPrice",
          // value: 3000,
          // method: "gte",
        };

  // HERE WE CAN SORT THE DATA WHOCH RECIEVED FROM THE DATABASE.
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // THE PAGINATION  THE BELOW OCDES!
  // I BROD THAT FROM PAGINATION PAGE
  // Finding and calculating the CurrentPage. for pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // HERE SI THE ORGINAL QUERY {QUERY}
  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", sortBy, filter, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // THE {PRE FETCHING} FRO THE PAGINATIONS!
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // PRE-FETCHING FORWARD
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", sortBy, filter, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // PRE-FETCHING BACKWARD
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", sortBy, filter, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count, error };
}
