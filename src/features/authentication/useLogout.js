import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateLogout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Successfully logged out.");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: () => toast.error("There was problem in logging you out."),
  });
  return { mutateLogout, isLoggingOut };
}

export default useLogout;
