"use client";
import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, CreditCard, FolderOpen } from "lucide-react";

interface Stats {
  total_students: number;
  active_students: number;
  inactive_students: number; 
  total_payments: number;
  total_resources: number;
}

interface Props {
  refreshKey: number;
}

export default function StatsCards({ refreshKey }: Props) {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
      cache: "no-store", // ← important to prevent caching
    })
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey]); // Re-fetch when refreshKey changes

  const cards = [
    {
      label: "Total Students",
      value: stats?.total_students ?? 0,
      icon: Users,
      color: "bg-forest-50 text-forest-700",
      border: "border-forest-200",
    },
    {
      label: "Active Students",
      value: stats?.active_students ?? 0,
      icon: UserCheck,
      color: "bg-forest-50 text-forest-700",
      border: "border-forest-200",
    },
    {
      label: "Pending Approval",
      value: stats?.inactive_students ?? 0,
      icon: UserX, // ← new icon
      color: "bg-red-50 text-red-600",
      border: "border-red-100",
    },
    {
      label: "Total Payments (₦)",
      value: stats?.total_payments
        ? `₦${Number(stats.total_payments).toLocaleString()}`
        : "₦0",
      icon: CreditCard,
      color: "bg-gold-50 text-gold-700",
      border: "border-gold-200",
    },
    {
      label: "Resources Uploaded",
      value: stats?.total_resources ?? 0,
      icon: FolderOpen,
      color: "bg-forest-50 text-forest-700",
      border: "border-forest-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {cards.map(({ label, value, icon: Icon, color, border }) => (
        <div
          key={label}
          className={`bg-white rounded-2xl border ${border} p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
              <Icon size={20} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-parchment rounded animate-pulse" />
          ) : (
            <p className="font-display text-3xl font-bold text-forest-900">{value}</p>
          )}
          <p className="text-forest-500 text-sm mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
