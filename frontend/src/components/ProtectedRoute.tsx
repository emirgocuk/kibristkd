// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = { requireAdmin?: boolean };

export default function ProtectedRoute({ requireAdmin = true }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // burada küçük bir spinner gösterebilirsin

  // Güvenlik ağı: login sayfasını asla engelleme
  if (location.pathname === "/girne") return <Outlet />;

  // Oturum yoksa → /girne (aynı path'e tekrar Navigate etme)
  if (!user) {
    if (location.pathname !== "/girne") {
      return (
        <Navigate
          to="/girne"
          replace
          state={{ reason: "auth", from: location.pathname }}
        />
      );
    }
    return <Outlet />;
  }

  // Admin şartı ve rol uyuşmazlığı → /girne
  if (requireAdmin && user.role !== "admin") {
    if (location.pathname !== "/girne") {
      return (
        <Navigate
          to="/girne"
          replace
          state={{ reason: "denied", from: location.pathname }}
        />
      );
    }
    return <Outlet />;
  }

  return <Outlet />;
}
