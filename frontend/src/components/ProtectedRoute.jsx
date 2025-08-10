import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ requireAdmin = true }) {
  const { user } = useAuth();
  const location = useLocation();

  // login sayfasını asla engelleme
  if (location.pathname === '/girne') return <Outlet />;

  if (!user) {
    return <Navigate to="/girne" replace state={{ from: location.pathname }} />;
  }
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/girne" replace state={{ denied: true }} />;
  }
  return <Outlet />;
}
