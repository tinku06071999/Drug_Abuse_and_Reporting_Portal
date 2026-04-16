import api from "./apiClient";

// Backend: /api/users/signup  (context-path=/api + @RequestMapping("/users") + @PostMapping("/signup"))
export const signupUser = (payload) => api.post("/public/save-user", payload);

// Backend: /api/users/login
export const loginUser = (payload) => api.post("/auth/login", payload);

// Get current user profile (name, email, id)
export const getUserName = () => api.get("/users/get-user-name");

// Get user reports for dashboard
export const getUserReports = () => api.get("/users/user-reports");
