import api from "@/lib/axios";

export const getStudents        = () => api.get("/api/admin/students");
export const addStudent         = (data: object) => api.post("/api/admin/students", data);
export const updateStudent      = (id: number, data: object) => api.patch(`/api/admin/students/${id}`, data);
export const deleteStudent      = (id: number) => api.delete(`/api/admin/students/${id}`);
export const uploadResource     = (form: FormData) =>
  api.post("/api/admin/resources", form, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteResource     = (id: number) => api.delete(`/api/admin/resources/${id}`);
export const createAnnouncement = (data: object) => api.post("/api/admin/announcements", data);
export const deleteAnnouncement = (id: number) => api.delete(`/api/admin/announcements/${id}`);
export const uploadResult       = (data: object) => api.post("/api/admin/results", data);
export const deleteResult       = (id: number) => api.delete(`/api/admin/results/${id}`);
export const createLink         = (data: object) => api.post("/api/admin/links", data);
export const updateLink         = (id: number, data: object) => api.patch(`/api/admin/links/${id}`, data);
export const deleteLink         = (id: number) => api.delete(`/api/admin/links/${id}`);
export const getPayments        = () => api.get("/api/admin/payments");
export const recordPayment      = (data: object) => api.post("/api/admin/payments", data);
export const getAdminStats      = () => api.get("/api/admin/stats");
