import api from "@/lib/axios";

export const loginUser    = (email: string, password: string) =>
  api.post("/api/auth/login", { email, password });

export const registerUser = (data: {
  full_name: string; email: string; phone: string; password: string;
}) => api.post("/api/auth/register", data);

export const logoutUser   = () => api.post("/api/auth/logout");
export const getMe        = () => api.get("/api/auth/me");
