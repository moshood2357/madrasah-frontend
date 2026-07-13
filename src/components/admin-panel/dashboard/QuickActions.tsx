"use client";
import Link from "next/link";
import {
  Bell, Link2, FolderOpen,
  BarChart2, CreditCard, Users
} from "lucide-react";

const actions = [
  {
    label: "Post Announcement",
    desc:  "Notify all students",
    href:  "/admin/announcements",
    icon:  Bell,
    color: "bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-100",
  },
  {
    label: "Add Classroom Link",
    desc:  "Google Classroom / Meet",
    href:  "/admin/links",
    icon:  Link2,
    color: "bg-forest-50 text-forest-700 border-forest-200 hover:bg-forest-100",
  },
  {
    label: "Upload Resource",
    desc:  "Notes, PDFs, books",
    href:  "/admin/resources",
    icon:  FolderOpen,
    color: "bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-100",
  },
  {
    label: "Upload Results",
    desc:  "Student scores & grades",
    href:  "/admin/results",
    icon:  BarChart2,
    color: "bg-forest-50 text-forest-700 border-forest-200 hover:bg-forest-100",
  },
  {
    label: "Record Payment",
    desc:  "Manual payment entry",
    href:  "/admin/payments",
    icon:  CreditCard,
    color: "bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-100",
  },
  {
    label: "Manage Students",
    desc:  "View all students",
    href:  "/admin/students",
    icon:  Users,
    color: "bg-forest-50 text-forest-700 border-forest-200 hover:bg-forest-100",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-parchment">
        <h2 className="font-display text-lg font-semibold text-forest-900">
          Quick Actions
        </h2>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3">
        {actions.map(({ label, desc, href, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group ${color}`}
          >
            <Icon size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold leading-tight">{label}</p>
              <p className="text-xs opacity-60 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
