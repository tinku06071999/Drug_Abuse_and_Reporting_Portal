import api from "./apiClient";

export const saveEmployee = (payload) => api.post("/employees/save_employee", payload);
export const getEmployees = () =>api.get("/employees/get_all_employees");
export const verifyEmployee = (employeeId) =>api.put(`/employees/verify_employee/${employeeId}`);
