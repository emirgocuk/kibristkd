import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GirneLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      // Panel’e yönlen ve "başarıyla giriş" bilgisini taşı
      navigate("/girne/panel", { replace: true, state: { justLoggedIn: true } });
    } catch (e) {
      console.error(e);
      setErr("Giriş başarısız. Bilgileri kontrol edin.");
    }
  }

  // Tailwind sınıflarını bir değişkende toplamak okunabilirliği artırır
  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block mb-1 text-sm font-medium text-gray-700";

  return (
    // Container -> div + container sınıfları
    <div className="container mx-auto max-w-md px-4 py-12">
      {/* Paper -> div + border/shadow sınıfları */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Typography -> h1 */}
        <h1 className="mb-4 text-xl font-bold text-gray-800">Girne Panel Girişi</h1>
        {/* Stack -> form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="email" className={labelClasses}>E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClasses}>Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClasses}
            />
          </div>

          {/* Alert -> div */}
          {err && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700" role="alert">
              {err}
            </div>
          )}
          
          {/* Button -> button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}