import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  // FETCHING OR ACCESSING THE QueryClient IN TEH BELOW.
  const queryClinet = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),

    onSuccess: () => {
      toast.success("The cabin has been deleted sucessfully!😍");

      queryClinet.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => toast.error(err.message),

    // THE SAME WORK THE ABOVE DOES.
    // mutationFn: deleteCabin,
  });

  return { isDeleteing, deleteCabin };
}
