import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  // FOR EDITING THE SETTING
  const { mutate: updateSetting, isLoading: isUpdateing } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("WellDone!👌 The Setting has benn Edited successfully!😍");
      QueryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdateing };
}
