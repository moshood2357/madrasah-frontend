"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileText,
  Download,
  BarChart2,
  CreditCard,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Classroom", href: "/student/classroom", icon: BookOpen },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardList },
  { label: "Tests", href: "/student/tests", icon: FileText },
  { label: "Resources", href: "/student/resources", icon: Download },
  { label: "Results", href: "/student/results", icon: BarChart2 },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
  { label: "Announcements", href: "/student/announcements", icon: Bell },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-forest-900 text-white flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center border-b border-forest-700 h-16 px-3 ${
          collapsed ? "justify-center" : "justify-between px-5"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/logo4.png"
              alt="Logo"
              width={32}
              height={32}
              className="flex-shrink-0"
            />
            <span className="font-display text-base text-gold-300 truncate">
              Dar Al-Arqam Global Institute
            </span>
          </div>
        )}
        {collapsed && (
          <Image
            src="/logo4.png"
            alt="Logo"
            width={32}
            height={32}
            className="flex-shrink-0"
          />
        )}

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden md:flex w-6 h-6 items-center justify-center rounded text-white/90 bg-gold-500 hover:bg-gold-400 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center rounded-lg text-sm transition-colors ${
                collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
              } ${
                isActive
                  ? "bg-gold-500 text-forest-900 font-semibold"
                  : "text-white/70 hover:bg-forest-700 hover:text-white"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-forest-700">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center w-full rounded-lg text-sm text-white/70 hover:bg-forest-700 hover:text-white transition-colors ${
            collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
          }`}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
