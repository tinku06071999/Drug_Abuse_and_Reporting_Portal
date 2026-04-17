import api from "./apiClient";

export const signupUser = (payload) => api.post("/public/save-user", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);
export const getUserDetails=() => api.get("/users/get-user-details")
export const getUserName = () => api.get("/users/get-user-name");
export const getUserReports = () => api.get("/users/user-reports");
