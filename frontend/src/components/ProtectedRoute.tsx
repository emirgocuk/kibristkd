import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = true }: { requireAdmin?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // küçük spinner koyabilirsin

  // 1) Login sayfası asla engellenmesin (yanlışlıkla bu wrapper içine alınsa bile loop kırılır)
  if (location.pathname === "/girne") {
    return <Outlet />;
  }

  // 2) Giriş yoksa /girne'ye yönlendir (aynı path'e tekrar Navigate etme)
  if (!user) {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "auth", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  // 3) Admin şartı varsa ve kullanıcı admin değilse
  if (requireAdmin && user.role !== "admin") {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "denied", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  return <Outlet />;
}
