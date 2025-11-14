
import { API_URL } from "@env";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

// --------------------------
// Domain Models
// --------------------------
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

// Extend Axios config
export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  silent?: boolean; // skip global 401 handling
}

// --------------------------
// Axios Instance
// --------------------------
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// --------------------------
// Request Interceptor
// --------------------------
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config as CustomAxiosConfig;
});

// --------------------------
// Response Interceptor
// --------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const cfg = error.config as CustomAxiosConfig | undefined;

    if (error.response?.status === 401 && !cfg?.silent) {
      console.log("401 unauthorized — redirect to login?");
      // TODO: SecureStore.deleteItemAsync("token");
      // TODO: navigation.reset('/login');
    }

    return Promise.reject(error);
  }
);


