import axios from "axios";

// İstersen .env ile ayarla: const baseURL = import.meta.env.VITE_API_BASE || "/api";
const baseURL = "/api";

const http = axios.create({
  baseURL,
  withCredentials: false,
});

// --- Global Authorization header yönetimi ---
export function attachToken(token) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}

// --- URL normalizasyonu ---
// Eğer endpoint yanlışlıkla "/api/..." diye gelirse, baseURL ile birleşince "/api/api/..." oluyordu.
// Bu interceptor, istek URL'si "/api/..." ile başlıyorsa öndeki "/api"yi temizler.
http.interceptors.request.use((config) => {
  if (typeof config.url === "string") {
    // mutlak URL ise dokunma
    if (!/^https?:\/\//i.test(config.url)) {
      if (config.url.startsWith("/api/")) {
        config.url = config.url.replace(/^\/api(\/?)/, "/"); // "/api/foo" -> "/foo"
      }
      // çift slashları path içinde sadeleştir (http(s) yokken güvenli)
      config.url = config.url.replace(/\/{2,}/g, "/");
    }
  }
  return config;
});

// --- unwrap yardımcıları ---
export async function unwrap(promise) {
  const res = await promise;
  const payload = res?.data;
  if (payload && typeof payload === "object") {
    if (payload.success === false) {
      throw new Error(payload.message || "İstek başarısız");
    }
    if ("data" in payload) return payload.data;
  }
  return payload;
}

export default http;
