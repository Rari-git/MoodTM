import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

// ------------------------------------
//  HARD-CODED BACKEND URL
//  (înlocuiește cu URL-ul tău real)
// ------------------------------------
export const API_URL = "https://BACKEND-TAU.vercel.app"; 
// exemplu: "https://moodtm-backend.vercel.app"

// ------------------------------------
// Domain Models (le păstrăm exact ca la tine)
// ------------------------------------
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Extend Axios Config
export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  silent?: boolean; // skip 401 global handling
}

// ------------------------------------
// Axios Instance
// ------------------------------------
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ------------------------------------
// Request Interceptor (Unauthorized / JWT)
// ------------------------------------
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config as CustomAxiosConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ------------------------------------
// Response Interceptor (Handle 401)
// ------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const cfg = error.config as CustomAxiosConfig | undefined;

    if (error.response?.status === 401 && !cfg?.silent) {
      console.log("❌ 401 Unauthorized — user must re-login");

      // Exemplu:
      // await SecureStore.deleteItemAsync("token");
      // router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  }
);

export default api;
