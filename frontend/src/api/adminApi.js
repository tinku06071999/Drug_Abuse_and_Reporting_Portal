import api from "./apiClient";

export const createAdmin = (payload) => api.post("/admin/create_admin");

