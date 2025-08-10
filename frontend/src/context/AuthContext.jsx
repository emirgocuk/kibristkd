import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthCtx = createContext(null);

function setToken(t) { if (t) localStorage.setItem("token", t); else localStorage.removeItem("token"); }
function getToken() { return localStorage.getItem("token"); }

// Tüm isteklerde token header'ı otomatik eklensin
axios.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = getToken();
      if (!t) { setLoading(false); return; }
      try {
        const r = await axios.get("/api/auth/me");
        const me = r?.data?.data ?? r?.data?.user ?? null;
        setUser(me);
      } catch {
        setToken(null); setUser(null);
      } finally { setLoading(false); }
    })();
  }, []);

  // login user'ı döndürsün ki GirneLogin anında yönlendirsin
  const login = async (email, password) => {
    const r = await axios.post("/api/auth/login", { email, password });
    const payload = r?.data?.data ?? r?.data; // { token, user }
    const token = payload?.token;
    const safeUser = payload?.user;
    if (!token || !safeUser) throw new Error("Sunucudan beklenen yanıt gelmedi");
    setToken(token); setUser(safeUser);
    return safeUser;
  };

  const logout = () => { setToken(null); setUser(null); };

  return <AuthCtx.Provider value={{ user, loading, login, logout }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
