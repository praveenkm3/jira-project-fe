import { createBrowserRouter  } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { GuestRoute } from "../components/GuestRoute";
import { Dashboard } from "../pages/Dashboard";
import { Projects } from "../pages/Projects";
import { ProjectDetails } from "../components/ProjectDetails";
import { Issues } from "../pages/Issues";
import IssueDetail from "../pages/IssueDetails";
import Members from "../pages/Members";
import { AdminRestrictedRoute } from "./AdminRestricted";

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
      {path:'/issues/:issueId',Component:IssueDetail},
      {path:'/members',Component:Members},
      {
        element:<AdminRestrictedRoute />,
        children:[
           {path:'/issues',Component:Issues},
        ]
        
      }
    ],
  },
]);

export default router;