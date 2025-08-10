import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : '',
  withCredentials: false,
});

export function setToken(token) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}
export function getToken() {
  return localStorage.getItem('token');
}

http.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export function unwrap(resp, fallback) {
  if (resp?.data?.data !== undefined) return resp.data.data;
  if (resp?.data !== undefined) return resp.data;
  return fallback;
}

export default http;
