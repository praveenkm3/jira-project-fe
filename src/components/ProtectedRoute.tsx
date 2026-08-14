import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";



export function ProtectedRoute() {
  const { currentUser } = UseAuth()!;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <Sidebar>
        <Outlet />
      </Sidebar>
    );
  }
}