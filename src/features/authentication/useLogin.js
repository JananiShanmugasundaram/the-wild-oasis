import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateAuth, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success("successfully logged in");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password is incorrect.");
      console.error("ERR", err);
    },
  });
  return { mutateAuth, isLoading };
}

export default useLogin;
