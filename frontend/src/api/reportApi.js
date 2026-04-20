import api from "./apiClient";

export const createReport = (payload) => api.post("/public/save-report", payload);
export const getAllReports = () => api.get("/reports/get-all-reports");

export const updateReportStatus  = (id) => api.put("/reports/update-report-status", { id });
export const getReportsByUser = () => api.get("/reports/my");

export const getReportsByDate = (isoDate) => api.get("/reports/reports-by-date");
// no of resolved reports

export const getResolvedReports = () => api.get("/reports/total-resolved-reports");

//no of pending reports

export const getPendingReports = () => api.get("/reports/total-pending-reports");