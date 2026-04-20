// frontend/src/services/ApiService.js
import axios from "axios";

/**
 * CHAT HISTORY DECISIONS:
 * ✅ You are using CRA + react-scripts
 * ✅ You are adding "proxy": "http://localhost:8080" in frontend/package.json
 * ✅ Spring Boot backend base path is /api (server.servlet.context-path=/api or controller mapping includes /api)
 *
 * Therefore: DO NOT hardcode http://localhost:8080 here.
 * Use relative baseURL = "/api" and let CRA proxy forward the calls to 8080.
 *
 * If someday you remove proxy, you can switch to env based URL:
 * baseURL: process.env.REACT_APP_API_BASE_URL || "/api"
 */
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

/**
 * Optional JWT support (safe to keep):
 * If your login returns a token and you store it in localStorage as "token",
 * it will be attached automatically to all requests.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Standard error helper so all pages get readable errors
 */
const unwrapError = (error, defaultMessage) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    defaultMessage
  );
};

const ApiService = {
  // =========================
  // USER APIs (Main requirement)
  // =========================

  /**
   * User Signup
   * ✅ Update endpoint to match YOUR Spring Boot mapping.
   * Common Spring style:
   *   POST /api/users/signup
   *
   * If your backend uses POST /api/signup instead, change below to "/signup".
   */
  userSignup: async ({ email, password, name }) => {
    try {
      const res = await api.post("/users/signup", { email, password, name });
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Signup failed"));
    }
  },

  /**
   * User Login
   * Common Spring style:
   *   POST /api/auth/login
   *
   * If your backend uses POST /api/login, change endpoint accordingly.
   */
  userLogin: async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data; // {token, user, message...}
    } catch (error) {
      throw new Error(unwrapError(error, "Login failed"));
    }
  },

  /**
   * Get logged-in user profile
   * GET /api/users/me
   */
  getMyProfile: async () => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Failed to load profile"));
    }
  },

  // =========================
  // REPORT APIs (Main requirement)
  // =========================

  /**
   * Submit report (create new report)
   * Recommended:
   *   POST /api/reports
   *
   * Your earlier service used POST /api/report (singular).
   * Choose one:
   *  - If backend = "/reports"  => keep as below
   *  - If backend = "/report"   => change endpoint to "/report"
   */
  createReport: async (reportData) => {
    try {
      const res = await api.post("/reports", reportData);
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Failed to submit report"));
    }
  },

  /**
   * Get all reports (admin use)
   * GET /api/reports
   */
  getAllReports: async () => {
    try {
      const res = await api.get("/reports");
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Failed to fetch reports"));
    }
  },

  /**
   * Get logged-in user's reports
   * GET /api/reports/my
   */
  getMyReports: async () => {
    try {
      const res = await api.get("/reports/my");
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Failed to fetch your reports"));
    }
  },

  /**
   * Get reports by date
   * IMPORTANT FROM CHAT HISTORY:
   * - LocalDateTime path variable caused errors
   * - Prefer query param and OffsetDateTime/Instant on backend
   *
   * Example call:
   *   GET /api/reports/by-date?date=2026-02-13T15:03:50.450Z
   */
  getReportsByDate: async (isoDateTime) => {
    try {
      const res = await api.get("/reports/by-date", {
        params: { date: isoDateTime },
      });
      return res.data;
    } catch (error) {
      throw new Error(unwrapError(error, "Failed to fetch reports by date"));
    }
  },

  // =========================
  // EXISTING APIs FROM YOUR OLD ApiService.js
  // (Kept, but corrected for proxy + Spring base)
  // =========================

  /**
   * OLD NAME: submitReportForm -> previously POST /api/report
   * Keeping it for compatibility with existing components that still call it.
   * It delegates to createReport (recommended endpoint).
   *
   * If your existing backend still uses "/report", switch endpoint inside createReport.
   */
//  submitReportForm: async (reportData) => {
//    return ApiService.createReport(reportData);
//  },

  /**
   * Employee list
   * GET /api/employee
   * If your backend uses "/employees", change accordingly.
   */
//  getEmployeeList: async () => {
//    try {
//      const res = await api.get("/employee");
//      return res.data;
//    } catch (error) {
//      throw new Error(unwrapError(error, "Failed to fetch employee list"));
//    }
//  },

  /**
   * WhatsApp message API
   * POST /api/Sendwhatsapp
   *
   * NOTE: Endpoint has capital S in your old code.
   * Spring mappings are case-sensitive, so keep it EXACT if backend is that way.
   * Best practice: rename backend endpoint to lowercase later.
   */
//  sendWhatsAppMessage: async (mobile, message) => {
//    try {
//      const res = await api.post("/Sendwhatsapp", { mobile, message });
//      return res.data;
//    } catch (error) {
//      throw new Error(unwrapError(error, "Failed to send WhatsApp message"));
//    }
//  },
};

export default ApiService;