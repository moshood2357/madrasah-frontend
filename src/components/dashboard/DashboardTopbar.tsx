"use client";
import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";

export default function DashboardTopbar() {
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserName(JSON.parse(user).full_name || "Student");
  }, []);

  return (
    <header className="h-16 bg-white border-b border-parchment px-6 flex items-center justify-between">
      <h1 className="font-display text-xl text-forest-800 font-semibold">
        Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <button className="relative text-forest-600 hover:text-forest-900">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-forest-800">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}
