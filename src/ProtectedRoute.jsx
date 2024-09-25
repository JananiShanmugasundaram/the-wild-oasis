import useUser from "./useUser";
import Spinner from "./ui/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledFullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <StyledFullPage>
        <Spinner />
      </StyledFullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
