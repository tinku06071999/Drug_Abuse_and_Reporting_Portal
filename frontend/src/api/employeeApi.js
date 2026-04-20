import api from "./apiClient";

export const saveEmployee = (payload) => api.post("/public/save-employee", payload);
export const getEmployees = () =>api.get("/employees/get-all-employees");
export const verifyEmployee = (employeeId) =>api.put(`/employees/verify-employee/${employeeId}`);
export const makeAdmin = (employeeId) =>api.put(`/employees/make-admin/${employeeId}`);

