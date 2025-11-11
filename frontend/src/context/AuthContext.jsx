import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axios";
import { toast, ToastContainer } from "react-toastify";
import Toast from "../components/Toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          toast(
            <Toast
              type="error"
              message="Session expired. Please log in again."
            />
          );
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast(<Toast type="success" message="Logged out successfully" />);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        closeButton={false}
        toastClassName="bg-transparent p-0 shadow-none"
        bodyClassName="p-0"
        toastStyle={{ background: "transparent", boxShadow: "none", padding: 0 }}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
