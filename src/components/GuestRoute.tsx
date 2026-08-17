import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../contexts/AuthContext";

export function GuestRoute() {
  const { currentUser } = UseAuth()!;

  if (currentUser) { 
    return <Navigate to="/projects" replace />;
  }

  return <Outlet />;
}