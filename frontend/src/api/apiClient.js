import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
  // If you use proxy, keep baseURL "" and call "/api/..."
  headers: { "Content-Type": "application/json" },
 withCredentials: true, // <--- add this if you use cookie-based auth
});

// Automatically attach token if you use JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;