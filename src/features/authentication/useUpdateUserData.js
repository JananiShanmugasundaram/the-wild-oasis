import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserDataOrPassword } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useUpdateUserData() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateUserMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserDataOrPassword,
    onSuccess: (data) => {
      toast.success("User account successfully updated.");
      queryClient.setQueryData({ queryKey: ["user"], updater: data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/account");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUserMutate, isUpdating };
}

export default useUpdateUserData;
