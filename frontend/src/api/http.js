// frontend/src/api/http.js
// Kapsamlı Axios instance + yardımcılar
// - BaseURL .env'den veya "/api"
// - URL normalizasyonu: baseURL + endpoint çakışmalarını düzeltir ("/api/api/...").
// - Authorization: default header + opsiyonel async tokenProvider
// - FormData gönderiminde Content-Type'ı otomatik bırakır (boundary için)
// - Dil ve Tenant header'ları
// - 401/403 yakalama için dışarıdan handler atama
// - unwrap & safeUnwrap yardımcıları
// - Hata standardizasyonu: toError()

import axios from "axios";

// ---- Ayarlar (ENV > varsayılan) ----
const DEFAULT_BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE
    ? import.meta.env.VITE_API_BASE
    : "/api";

const DEFAULT_WITH_CREDENTIALS =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_WITH_CREDENTIALS === "true";

// ---- İç state ----
let _baseURL = normalizeBase(DEFAULT_BASE_URL);
let _withCredentials = !!DEFAULT_WITH_CREDENTIALS;
let _language = "tr-TR";
let _tenant = null; // örn: "acme"
let _onUnauthorized = null; // (error, config) => void
let _tokenProvider = null;  // async () => string | null

// ---- Axios instance ----
const http = axios.create({
  baseURL: _baseURL,
  withCredentials: _withCredentials,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

// ---- Yardımcı: base path çıkar ----
function normalizeBase(url) {
  // "http://x/api" -> aynı kalır, "/api" -> aynı kalır
  if (!url) return "/api";
  // sondaki "/"'ları sadeleştir
  return url.replace(/\/+$/, "") || "/";
}

function basePathOf(url) {
  try {
    // absolute ise pathname al
    const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://x");
    return u.pathname.replace(/\/+$/, "");
  } catch {
    // relative base
    return url.startsWith("/") ? url.replace(/\/+$/, "") : `/${url.replace(/\/+$/, "")}`;
  }
}

function isAbsoluteURL(u) {
  return /^https?:\/\//i.test(u);
}

// ---- Request Interceptor ----
http.interceptors.request.use(async (config) => {
  // 1) URL normalizasyonu: basePath + endpoint çift /api sorununu çöz
  const basePath = basePathOf(_baseURL); // örn "/api"
  if (typeof config.url === "string" && !isAbsoluteURL(config.url)) {
    // "/api/foo" -> "/foo" (sadece basePath ile başlıyorsa)
    const pattern = new RegExp(`^${basePath.replace(/\//g, "\\/")}(\\/?)`);
    if (config.url.startsWith(basePath + "/") || config.url === basePath) {
      config.url = config.url.replace(pattern, "/");
    }
    // path içindeki çift slash'ları sadeleştir
    config.url = config.url.replace(/\/{2,}/g, "/");
  }

  // 2) Dil & Tenant
  config.headers = config.headers || {};
  if (_language && !config.headers["Accept-Language"]) {
    config.headers["Accept-Language"] = _language;
  }
  if (_tenant && !config.headers["X-Tenant"]) {
    config.headers["X-Tenant"] = _tenant;
  }

  // 3) Authorization (skipAuth ile kapatılabilir)
  if (!config.skipAuth) {
    let token = http.defaults.headers.common?.Authorization?.replace(/^Bearer\s+/i, "") || null;
    // async tokenProvider varsa her istekte taze token al
    if (typeof _tokenProvider === "function") {
      try {
        const provided = await _tokenProvider();
        if (provided) token = provided;
      } catch {
        /* sağlayıcı hatasını yut; mevcut default varsa onu kullanır */
      }
    }
    if (token) {
      // Axios bazı ortamlarda fetch Headers benzeri bir yapı kullanabilir
      if (config.headers?.set) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  // 4) İçerik tipi (FormData ise bırak)
  const isFormData =
    typeof FormData !== "undefined" &&
    (config.data instanceof FormData ||
      // bazı durumlarda form-data polyfill'leri
      (config.headers && String(config.headers["Content-Type"] || "").includes("multipart/form-data")));

  if (isFormData) {
    // boundary için tarayıcı set etmeli—manuel Content-Type'ı temizle
    if (config.headers?.delete) {
      try { config.headers.delete("Content-Type"); } catch {}
    } else {
      delete config.headers["Content-Type"];
    }
  } else {
    // JSON varsayılanı (özel belirtmediyse)
    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  // 5) Params serialize (array=repeat: ?a=1&a=2)
  if (config.params && !config.paramsSerializer) {
    config.paramsSerializer = (params) => {
      const usp = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v == null) return;
        if (Array.isArray(v)) v.forEach((item) => usp.append(k, item));
        else usp.append(k, v);
      });
      return usp.toString();
    };
  }

  return config;
});

// ---- Response Interceptor ----
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 419 || status === 440) {
      // oturum/tarih geçmiş senaryoları
      if (typeof _onUnauthorized === "function") {
        try { _onUnauthorized(error, error?.config); } catch {}
      }
    }
    return Promise.reject(error);
  }
);

// ---- Public API: Ayarlar ----
export function setBaseURL(url) {
  _baseURL = normalizeBase(url);
  http.defaults.baseURL = _baseURL;
}
export function setWithCredentials(flag) {
  _withCredentials = !!flag;
  http.defaults.withCredentials = _withCredentials;
}
export function setLanguage(lang) {
  _language = lang || "tr-TR";
}
export function setTenant(tenant) {
  _tenant = tenant || null;
}
export function onUnauthorized(handler) {
  _onUnauthorized = typeof handler === "function" ? handler : null;
}
/**
 * @param {() => (string|Promise<string|null>) } fn
 * async token sağlayıcı; her istekte çağrılır.
 */
export function setTokenProvider(fn) {
  _tokenProvider = typeof fn === "function" ? fn : null;
}

// ---- Global Authorization header yönetimi (opsiyonel, kalırsa tokenProvider'a gerek yok) ----
export function attachToken(token) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
  return http;
}

// ---- Unwrap yardımcıları ----
/**
 * Axios yanıtından .data.data (yoksa .data) döndürür.
 * success === false ise Error fırlatır.
 */
export async function unwrap(promise) {
  const res = await promise;
  const payload = res?.data;
  if (payload && typeof payload === "object") {
    if (payload.success === false) {
      const msg = payload.message || payload.error || "İstek başarısız";
      throw toError({ response: { data: payload, status: res?.status }, message: msg });
    }
    if ("data" in payload) return payload.data;
  }
  return payload;
}

/**
 * Hata yutmadan güvenli sonuç döndürür.
 * return { ok: boolean, data?: any, error?: StdError }
 */
export async function safeUnwrap(promise) {
  try {
    const data = await unwrap(promise);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: toError(e) };
  }
}

/**
 * Hata standardizasyonu
 * return { message, status, details }
 */
export function toError(err) {
  // Axios mu?
  const isAxios = !!(err && (err.isAxiosError || err.config || err.response));
  if (!isAxios) {
    return {
      message: err?.message || "Bilinmeyen hata",
      status: undefined,
      details: err || null,
    };
  }
  const status = err?.response?.status;
  const data = err?.response?.data;
  const message =
    (typeof data === "object" && (data?.message || data?.error)) ||
    err?.message ||
    "İstek başarısız";
  return {
    message,
    status,
    details: data ?? null,
  };
}

// ---- Kısa yardımcılar ----
export function get(url, params, config = {}) {
  return http.get(url, { ...config, params });
}
export function post(url, data, config = {}) {
  return http.post(url, data, config);
}
export function put(url, data, config = {}) {
  return http.put(url, data, config);
}
export function patch(url, data, config = {}) {
  return http.patch(url, data, config);
}
export function del(url, config = {}) {
  return http.delete(url, config);
}

export default http;
