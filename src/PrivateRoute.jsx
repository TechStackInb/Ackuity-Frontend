import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  // Check if the user is logged in
  if (!authState.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
