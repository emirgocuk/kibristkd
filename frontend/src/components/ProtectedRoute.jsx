import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = true }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (location.pathname === "/girne") return <Outlet />;

  if (!user) {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "auth", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  const role = (user.role || "").toLowerCase();
  if (requireAdmin && role !== "admin") {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "denied", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  return <Outlet />;
}
