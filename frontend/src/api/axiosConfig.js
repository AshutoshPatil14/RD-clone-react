import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL_PRODUCTION
    : import.meta.env.VITE_API_BASE_URL_DEVELOPMENT,
  withCredentials: true,
});

export default api;
