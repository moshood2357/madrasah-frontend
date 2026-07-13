"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function StudentLayout({
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
      if (parsed.role !== "student") {
        router.replace("/login");
        return;
      }
      setReady(true);
    } catch {
      // Corrupt localStorage — clear and redirect
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }, [router]);

  // Show nothing while auth check runs
  if (!ready) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-cream">
      <StudentSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
