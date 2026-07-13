"use client";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileText,
  Download,
  BarChart2,
  CreditCard,
  Bell,
} from "lucide-react";

const tiles = [
  {
    label: "Classroom",
    desc: "Join your live class",
    href: "/student/classroom",
    icon: BookOpen,
    color: "bg-forest-900 text-white",
    hover: "hover:bg-forest-700",
  },
  {
    label: "Assignments",
    desc: "View & submit tasks",
    href: "/student/assignments",
    icon: ClipboardList,
    color: "bg-gold-500 text-forest-900",
    hover: "hover:bg-gold-400",
  },
  {
    label: "Tests",
    desc: "Take online tests",
    href: "/student/tests",
    icon: FileText,
    color: "bg-forest-900 text-white",
    hover: "hover:bg-forest-700",
  },
  {
    label: "Resources",
    desc: "Download materials",
    href: "/student/resources",
    icon: Download,
    color: "bg-gold-500 text-forest-900",
    hover: "hover:bg-gold-400",
  },
  {
    label: "Results",
    desc: "View your scores",
    href: "/student/results",
    icon: BarChart2,
    color: "bg-forest-900 text-white",
    hover: "hover:bg-forest-700",
  },
  {
    label: "Payments",
    desc: "Pay fees & history",
    href: "/student/payments",
    icon: CreditCard,
    color: "bg-gold-500 text-forest-900",
    hover: "hover:bg-gold-400",
  },
  {
    label: "Announcements",
    desc: "Latest updates",
    href: "/student/announcements",
    icon: Bell,
    color: "bg-forest-900 text-white",
    hover: "hover:bg-forest-700",
  },
];

export default function QuickAccessGrid() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-forest-900 mb-4">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tiles.map(({ label, desc, href, icon: Icon, color, hover }) => (
          <Link
            key={label}
            href={href}
            className={`${color} ${hover} rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group`}
          >
            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{label}</p>
              <p className="text-white text-xs opacity-80 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
