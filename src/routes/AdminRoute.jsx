import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();

  // While loading user data, don't render or redirect yet
  if (loading) return null; // or a spinner

  const isAdmin = userData?.role === "admin";

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
