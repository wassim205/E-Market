import { createBrowserRouter } from "react-router";
import Register from "../components/AuthPage/Register";
import Login from "../components/AuthPage/Login";
import Home from "../components/HomePage/Home";
import Logout from "../components/AuthPage/Logout";
import ProtectedRoute from "./ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"]}>
        <Logout />
      </ProtectedRoute>
    ),
  },
]);