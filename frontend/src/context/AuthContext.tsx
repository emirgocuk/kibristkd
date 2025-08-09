import React, { createContext, useContext, useEffect, useState } from "react";
import http, { setToken, getToken } from "../api/http";

type User = { id: number; name: string; role: string } | null;
type Ctx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
const AuthCtx = createContext<Ctx>(null as any);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!getToken()) return;
        const r = await http.get("/api/auth/me");
        setUser(r.data?.user ?? null);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const r = await http.post("/api/auth/login", { email, password });
    const token = r.data?.token as string | undefined;
    if (!token) throw new Error("Token gelmedi");
    setToken(token);
    setUser(r.data?.user ?? null);
  };

  const logout = () => { setToken(null); setUser(null); };

  return <AuthCtx.Provider value={{ user, loading, login, logout }}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
