import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",   // VERY IMPORTANT: must be empty to activate CRA proxy
  headers: { "Content-Type": "application/json" },
});

/**
 * Authorization helpers (unchanged)
 */
const applyAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

const bootstrapToken = () => {
  const token = localStorage.getItem("token");
  applyAuthHeader(token);
};
bootstrapToken();

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    applyAuthHeader(token);
  } else {
    console.warn("setAuthToken called with an invalid token");
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
  applyAuthHeader(null);
};

apiClient.interceptors.request.use(
  (config) => {
    const latestToken = localStorage.getItem("token");
    if (latestToken) {
      config.headers.Authorization = `Bearer ${latestToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

export default apiClient;