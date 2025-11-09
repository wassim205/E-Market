import { createBrowserRouter } from "react-router-dom";
// import Register from "../components/AuthPage/Register";
// import Login from "../components/AuthPage/Login";
import Home from "../pages/Home";
// import Logout from "../components/AuthPage/Logout";
// import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import NotFound from "../components/NotFound";
import ProductsList from "../pages/products/ProductList";
import ProductDetail from "../pages/products/ProductDetail";
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
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/products",
    element: <ProductsList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  
]);