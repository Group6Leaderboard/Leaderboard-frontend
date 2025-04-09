import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (
    !role ||
    !allowedRoles.some((allowed) => allowed.toLowerCase() === role.toLowerCase())
  ) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
