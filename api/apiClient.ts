
import { API_URL } from "@env";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Domain models
/*export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  // add other fields returned by your API user object as needed
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Axios instance
export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  silent?: boolean; // example: skip global error toast
}

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    (config as CustomAxiosConfig).headers.Authorization = `Bearer ${token}`;
  }
  return config as CustomAxiosConfig;
});

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string }>) => {
    const cfg = err.config as CustomAxiosConfig | undefined;
    if (!cfg?.silent && err.response?.status === 401) {
      // redirect to login, refresh token, …
    }
    return Promise.reject(err);
  }
);*/
