// Global Navbar
// Logo (left) + Nav links (centre) + "Student Portal" CTA button (right)
// Nav links: Home | About | Courses | Contact
// "Student Portal" button → /login  (opens login page)
// Mobile: hamburger menu with slide-down drawer
// Sticky on scroll, subtle backdrop-blur on scroll

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[var(--nav-height)] bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo4.png" alt="Madrasah Logo" width={70} height={44} />
          <span className="font-display text-xl font-semibold text-gold-300">
            Dar Al-Arqam Global Institute
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-gold-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/register"
          className="hidden md:inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          Student Portal
        </Link>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-forest-800 border-t border-forest-700 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/80 hover:text-gold-300 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="block bg-gold-500 text-forest-900 font-semibold text-center py-2.5 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Student Portal
          </Link>
        </div>
      )}
    </header>
  );
}
