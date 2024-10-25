import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

// THIS FUNCTION WAS BUILD FOR MAKING OR SIGNING A NEW USER
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account crated successfully, please verify that via your Email!"
      );
    },
  });

  return { signup, isLoading };
}
