import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig
} from 'axios';

// Domain models
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PageMeta {
  page: number;
  perPage: number;
  total: number;
}

export interface UsersResponse {
  data: User[];
  meta: PageMeta;
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
);
