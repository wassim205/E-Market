import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // while we validate token, show a simple loader (or nothing)
  if (loading) return <div>Checking auth…</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
