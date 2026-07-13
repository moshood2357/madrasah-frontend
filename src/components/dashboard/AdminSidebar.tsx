
"use client";
import Link       from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Link2, FolderOpen,
  BarChart2, CreditCard, Bell, LogOut,
  Settings, ChevronLeft, ChevronRight, Menu, X
} from "lucide-react";

const links = [
  { label: "Dashboard",     href: "/admin/dashboard",     icon: LayoutDashboard },
  { label: "Students",      href: "/admin/students",      icon: Users },
  { label: "Links",         href: "/admin/links",         icon: Link2 },
  { label: "Resources",     href: "/admin/resources",     icon: FolderOpen },
  { label: "Results",       href: "/admin/results",       icon: BarChart2 },
  { label: "Payments",      href: "/admin/payments",      icon: CreditCard },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
];

export default function AdminSidebar() {
  const pathname    = usePathname();
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [adminName,   setAdminName]   = useState("Admin");

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setAdminName(JSON.parse(raw).full_name?.split(" ")[0] || "Admin");
  }, []);

  // Auto-collapse on mobile
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setCollapsed(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const SidebarContent = () => (
    <aside className={`bg-forest-900 text-white flex flex-col h-full transition-all duration-300 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className={`flex items-center border-b border-forest-700 h-16 px-3 ${
        collapsed ? "justify-center" : "justify-between px-5"
      }`}>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display text-base text-gold-300 truncate">Admin Panel</p>
            <p className="text-xs text-white/40 truncate">{adminName}</p>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-forest-700 rounded-lg flex items-center justify-center">
            <span className="text-gold-300 font-bold text-sm">A</span>
          </div>
        )}
        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-6 h-6 items-center justify-center rounded text-white/90 hover:text-white transition-colors flex-shrink-0 bg-gold-500"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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

      {/* Bottom — settings + logout */}
      <div className="p-2 border-t border-forest-700 space-y-0.5">
        <Link
          href="/admin/settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center rounded-lg text-sm text-white/60 hover:text-white hover:bg-forest-700 transition-colors ${
            collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2"
          }`}
        >
          <Settings size={16} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
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

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-forest-900 text-white rounded-lg flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:block h-full">
        <SidebarContent />
      </div>

      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 animate-fade-down">
            <div className="relative h-full">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 right-3 z-10 w-7 h-7 bg-forest-700 rounded-lg flex items-center justify-center text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
              <SidebarContent />
            </div>
          </div>
        </>
      )}
    </>
  );
}



















