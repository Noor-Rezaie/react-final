import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // FOR UPDATEING THE CUSER ACCOUNTS
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(
        "WellDone!👌 The User account has benn Edited successfully!😍 "
      );
      queryClient.setQueryData(["user"], user);
      console.log(user);

      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
