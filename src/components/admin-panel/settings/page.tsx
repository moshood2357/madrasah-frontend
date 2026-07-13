"use client";
import { useState } from "react";
import ProfileSettings  from "@/components/admin/settings/ProfileSettings";
import PasswordSettings from "@/components/admin/settings/PasswordSettings";
import MadrasahSettings from "@/components/admin/settings/MadrasahSettings";
import DangerZone       from "@/components/admin/settings/DangerZone";
import { User, Lock, Settings, AlertTriangle } from "lucide-react";

type Tab = "profile" | "password" | "madrasah" | "danger";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile",   label: "Profile",          icon: <User       size={16} /> },
  { id: "password",  label: "Password",          icon: <Lock       size={16} /> },
  { id: "madrasah",  label: "Madrasah",          icon: <Settings   size={16} /> },
  { id: "danger",    label: "Danger Zone",       icon: <AlertTriangle size={16} /> },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page header */}
      <div className="page-header mb-0">
        <h1 className="page-header__title">Settings</h1>
        <p className="page-header__subtitle">
          Manage your account and Madrasah configuration.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-forest-50 p-1 rounded-xl w-fit">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? "bg-white text-forest-900 shadow-sm"
                : id === "danger"
                ? "text-red-400 hover:text-red-600"
                : "text-forest-500 hover:text-forest-700"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-up">
        {activeTab === "profile"  && <ProfileSettings  />}
        {activeTab === "password" && <PasswordSettings />}
        {activeTab === "madrasah" && <MadrasahSettings />}
        {activeTab === "danger"   && <DangerZone       />}
      </div>
    </div>
  );
}
