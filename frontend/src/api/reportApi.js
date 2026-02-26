import api from "./apiClient";

export const createReport = (payload) => api.post("/reports/savereport", payload);
export const getAllReports = () => api.get("/reports/get_all_reports");

export const updateReportStatus  = (id) => api.put("/reports/update_report_status", { id });
export const getReportsByUser = () => api.get("/reports/my");

export const getReportsByDate = (isoDate) => api.get("/reports/reports_by_date");
// no of resolved reports

export const getResolvedReports = () => api.get("/reports/total_resolved_reports");

//no of pending reports

export const getPendingReports = () => api.get("/reports/total_pending_reports");