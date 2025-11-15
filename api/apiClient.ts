// api/apiClient.ts
import axios from "axios";

export const API_URL = "https://BACKEND-TAU.vercel.app"; // schimbă cu url-ul tău real

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default api;
