/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // a) load the user
  const { isLoading, isAuthenticated } = useUser();

  // c) no user redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );

  //   b) spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // d)fi found user render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
