import api from "@/lib/axios";

export const getDashboardSummary = () => api.get("/api/student/dashboard-summary");
export const getAnnouncements    = () => api.get("/api/announcements");
export const getResources        = () => api.get("/api/resources");
export const getAssignments      = () => api.get("/api/assignments");
export const getTests            = () => api.get("/api/tests");
export const getMyResults        = () => api.get("/api/results/me");
export const getMyPayments       = () => api.get("/api/payments/me");
export const verifyPayment       = (ref: string) =>
  api.post("/api/payments/verify", { reference: ref });
