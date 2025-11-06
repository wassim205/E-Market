// components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove token and user info
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");

      // Redirect to home or login
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded bg-red-600 text-white cursor-pointer"
    >
      Logout
    </button>
  );
}
