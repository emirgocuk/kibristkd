import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import http, { attachToken } from "../api/http";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Açılışta localStorage'tan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kibristkd_auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
        attachToken(parsed.token || null);
      }
    } catch {}
    setLoading(false);
  }, []);

  // Token değiştikçe axios header'a yansıt
  useEffect(() => {
    attachToken(token);
  }, [token]);

  async function login(email, password) {
    const res = await http.post("/auth/login", { email, password });
    const data = res?.data?.data || {};
    const next = { token: data.token, user: data.user };
    localStorage.setItem("kibristkd_auth", JSON.stringify(next));
    setUser(data.user);
    setToken(data.token);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("kibristkd_auth");
    setUser(null);
    setToken(null);
    attachToken(null);
  }

  const value = useMemo(() => ({ user, token, loading, login, logout }), [user, token, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}