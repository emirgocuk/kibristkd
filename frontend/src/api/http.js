import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const http = axios.create({
  baseURL,
  withCredentials: false
});

// Backend { success, data } veya direkt dizi/obje dönebilir; ikisini de topluyoruz.
export const unwrap = async (promise) => {
  const res = await promise;
  return res?.data?.data ?? res?.data ?? null;
};

export const setAuthToken = (token) => {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
};

export default http;
