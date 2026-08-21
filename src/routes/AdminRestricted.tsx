import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../contexts/AuthContext";

export const AdminRestrictedRoute = () => {
  const { currentUser } = UseAuth()!;

  if (currentUser?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
