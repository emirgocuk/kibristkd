// frontend/src/api/http.js
import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

// İsteklere otomatik Bearer token ekle
http.interceptors.request.use((config) => {
  try {
    const t = localStorage.getItem("token");
    if (t) {
      if (config.headers?.set) {
        config.headers.set("Authorization", `Bearer ${t}`);
      } else {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${t}`; // <- düzeltilmiş
      }
    }
  } catch {}
  return config;
});

// 401 yakalama (isteğe bağlı yönlendirme yapılabilir)
http.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // Örn: token bozuksa otomatik çıkış
      // localStorage.removeItem("token");
      // window.location.href = "/girne";
    }
    return Promise.reject(err);
  }
);

/** Axios yanıtından .data.data (yoksa .data) döndürür */
export async function unwrap(promise) {
  const res = await promise;
  return res?.data?.data ?? res?.data;
}

/** İhtiyaç olursa manuel token eklemek için yardımcı */
export function attachToken(token) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
  return http;
}

export default http;
