// Shared TypeScript types

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: "student" | "admin";
  status: "active" | "inactive";
  created_at: string;
}

export interface Student {
  id: number;
  user_id: number;
  student_code: string;
  class_level: string;
  status: "active" | "inactive";
  user: User;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Resource {
  id: number;
  title: string;
  category: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface Link {
  id: number;
  type: "classroom" | "assignment" | "test";
  title: string;
  url: string;
  description?: string;
  due_date?: string;
  created_at: string;
}

export interface Result {
  id: number;
  student_id: number;
  subject: string;
  term: string;
  score: number;
  grade: string;
  remarks?: string;
  uploaded_at: string;
}

export interface Payment {
  id: number;
  student_id: number;
  amount: number;
  reference: string;
  status: "pending" | "success" | "failed";
  method: "paystack" | "manual";
  paid_at?: string;
  description?: string;
}
