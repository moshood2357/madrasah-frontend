"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(user);
      if (parsed.role !== "admin") {
        // Logged in but not admin — send back to student dashboard
        router.replace("/student/dashboard");
        return;
      }
      setReady(true);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-forest-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
