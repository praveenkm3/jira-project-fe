import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes.tsx";
import queryClient from "./hooks/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <App/>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </AuthProvider>
    </QueryClientProvider>
  </>,
);
