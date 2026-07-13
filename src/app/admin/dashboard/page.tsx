"use client";
import { useState, useEffect } from "react";
import StatsCards from "@/components/admin-panel/dashboard/StatsCards";
import RecentStudents from "@/components/admin-panel/dashboard/RecentStudents";
import QuickActions from "@/components/admin-panel/dashboard/QuickActions";
import RecentAnnouncements from "@/components/admin-panel/dashboard/RecentAnnouncements";

export default function AdminDashboardPage() {
  const [adminName, setAdminName] = useState("Admin");
  const [statsKey, setStatsKey] = useState(0); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setAdminName(JSON.parse(user).full_name || "Admin");
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-900">
          Assalamu Alaykum, {adminName} 👋
        </h1>
        <p className="text-forest-500 text-sm mt-1">
          Here's what's happening at Dar Al-Arqam Global Institute today.
        </p>
      </div>

      {/* Pass statsKey so StatsCards refetches when it changes */}
      <StatsCards refreshKey={statsKey} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentAnnouncements />
      </div>

      {/* Pass onStatusChange to trigger stats refresh */}
      <RecentStudents onStatusChange={() => setStatsKey((k) => k + 1)} />
    </div>
  );
}
