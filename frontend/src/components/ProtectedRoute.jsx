import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = true }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // DEBUG: akışı gör
  console.log("[ProtectedRoute]", { path: location.pathname, loading, user });

  if (loading) return null; // istersen buraya spinner

  // Login sayfasına asla bariyer koyma (yanlışlıkla sarmalanırsa loop kırılır)
  if (location.pathname === "/girne") {
    return <Outlet />;
  }

  // Giriş yoksa /girne'ye gönder (aynı sayfaya tekrar Navigate etme)
  if (!user) {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "auth", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  // Admin şartı varsa kontrol et
  if (requireAdmin && String(user.role || "").toLowerCase() !== "admin") {
    if (location.pathname !== "/girne") {
      return <Navigate to="/girne" replace state={{ reason: "denied", from: location.pathname }} />;
    }
    return <Outlet />;
  }

  return <Outlet />;
}
