import { createBrowserRouter  } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { GuestRoute } from "../components/GuestRoute";
import { Dashboard } from "../pages/Dashboard";
import { Projects } from "../pages/Projects";
import { ProjectDetails } from "../components/ProjectDetails";
import { Issues } from "../pages/Issues";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: "/", Component: Register },
      { path: "/login", Component: Login },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/home", Component: ProtectedRoute },
      { path: "/dashboard", Component: Dashboard },
      { path: "/projects", Component: Projects },
      { path: "/projects/:projectId", Component: ProjectDetails },
      {path:'/issues',Component:Issues}
    ],
  },
]);

export default router;