import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : "",
  withCredentials: false,
});

export function setToken(token: string | null) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}
export function getToken(): string | null {
  return localStorage.getItem("token");
}

http.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default http;
