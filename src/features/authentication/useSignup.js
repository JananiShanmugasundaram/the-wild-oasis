import toast from "react-hot-toast";
import { signUp } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useSignup() {
  const { mutate: signUpMutate, isLoading: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Account has been successfully created. Please verify the new account from the registered email address."
      );
    },
  });
  return { signUpMutate, isSigningUp };
}

export default useSignup;
