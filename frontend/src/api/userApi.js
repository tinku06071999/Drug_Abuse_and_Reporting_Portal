import api from "./apiClient";

// Backend: /api/users/signup  (context-path=/api + @RequestMapping("/users") + @PostMapping("/signup"))
export const signupUser = (payload) => api.post("/users/signup", payload);

// Backend: /api/users/login
export const loginUser = (payload) => api.post("/users/login", payload,{ withCredentials: true});

// Get current user profile (name, email, id)
export const getUserProfile = () => api.get("/users/getUserName",{ withCredentials: true});

// Get user reports for dashboard
export const getUserReports = () => api.get("/users/user_reports",{ withCredentials: true});
