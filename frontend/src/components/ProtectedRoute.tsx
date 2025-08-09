import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = true }: { requireAdmin?: boolean }) {
  const { user, loading } = useAuth();
  if (loading) return null; // veya küçük bir spinner
  if (!user) return <Navigate to="/girne" replace />;
  if (requireAdmin && user.role !== "admin") return <Navigate to="/girne" replace />;
  return <Outlet />;
}
