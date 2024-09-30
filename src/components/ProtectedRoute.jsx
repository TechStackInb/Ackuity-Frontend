import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>; 

  return auth.email ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
