import React, { createContext, useContext, useState } from 'react';
import http, { setAuthToken } from '../api/http';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await http.post('/api/auth/login', { email, password });
      if (data?.success) {
        setToken(data.data.token);
        setAuthToken(data.data.token);
        setUser(data.data.user);
        return { ok: true };
      }
      return { ok: false, message: data?.message || 'Giriş başarısız' };
    } catch (e) {
      return { ok: false, message: e?.response?.data?.message || 'Giriş başarısız' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
