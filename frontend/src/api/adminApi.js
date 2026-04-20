import api from "./apiClient";

export const createAdmin = (payload) => api.post("/admin/create-admin", payload);
export const loginAdmin = (payload) => api.post("/auth/login", payload);


