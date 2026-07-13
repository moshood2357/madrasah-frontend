"use client";
import { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [name, setName] = useState("Student");
  const [studentCode, setStudentCode] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("Assalamu Alaykum");

  useEffect(() => {
    // Get user from localStorage
    const raw = localStorage.getItem("user");
    if (raw) {
      const user = JSON.parse(raw);
      setName(user.full_name?.split(" ")[0] || "Student");
    }

    // Fetch student profile for student_code
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/dashboard-summary`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.student?.student_code) {
          setStudentCode(data.student.student_code);
        }
      })
      .catch(() => {});

    // Time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="relative bg-forest-900 rounded-2xl overflow-hidden p-7 text-white pattern-overlay--dark">
      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-gold-400/10 pointer-events-none" />
      <div className="absolute -bottom-8 -right-4 w-32 h-32 rounded-full border border-gold-400/10 pointer-events-none" />

      <div className="relative z-10">
        {/* Arabic greeting */}
        <p className="bismillah text-lg mb-1">بِسْمِ اللَّهِ</p>

        {/* Main greeting */}
        <h1 className="font-display text-3xl font-bold text-white mt-2">
          {greeting}, {name}! 👋
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Welcome to Dar Al-Arqam Global Institute student portal.
        </p>

        {/* Student ID badge */}
        {studentCode && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-1.5">
            <span className="text-white/50 text-xs">Student ID</span>
            <span className="text-gold-300 font-mono font-semibold text-sm">
              {studentCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
