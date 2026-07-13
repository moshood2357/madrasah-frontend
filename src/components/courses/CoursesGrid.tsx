// CoursesGrid.tsx
// Main courses listing — filter tabs + course cards grid
// Data is hardcoded here; swap for API fetch once backend /api/courses is ready

"use client";
import { useState } from "react";
import Link from "next/link";

type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
type Category = "All" | "Quran" | "Arabic" | "Fiqh" | "Studies";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: Exclude<Category, "All">;
  level: Level;
  duration: string;
  sessions: string;
  teacher: string;
  icon: string;
  featured?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Foundations of Tajweed",
    subtitle: "Quranic Recitation",
    description:
      "Learn the correct pronunciation and rules of Tajweed from scratch. Suitable for those who have little or no prior experience with Quranic recitation.",
    category: "Quran",
    level: "Beginner",
    duration: "12 weeks",
    sessions: "2x per week",
    teacher: "Ustadh Abdullah Yusuf",
    icon: "📖",
    featured: true,
  },
  {
    id: 2,
    title: "Hifz Programme",
    subtitle: "Quran Memorisation",
    description:
      "A structured memorisation programme with personalised revision schedules, weekly testing, and one-to-one support from a hafiz teacher.",
    category: "Quran",
    level: "All Levels",
    duration: "Ongoing",
    sessions: "5x per week",
    teacher: "Ustadh Abdullah Yusuf",
    icon: "🌙",
    featured: true,
  },
  {
    id: 3,
    title: "Arabic for Beginners",
    subtitle: "Classical Arabic Language",
    description:
      "Master the Arabic alphabet, basic grammar (Nahwu), and everyday vocabulary to begin reading and understanding Quranic and classical texts.",
    category: "Arabic",
    level: "Beginner",
    duration: "16 weeks",
    sessions: "2x per week",
    teacher: "Ustadha Maryam Idris",
    icon: "🔤",
    featured: true,
  },
  {
    id: 4,
    title: "Intermediate Arabic Grammar",
    subtitle: "Nahwu & Sarf",
    description:
      "A deep dive into Arabic morphology (Sarf) and syntax (Nahwu) using classical texts. Prerequisite: Arabic for Beginners or equivalent.",
    category: "Arabic",
    level: "Intermediate",
    duration: "20 weeks",
    sessions: "2x per week",
    teacher: "Ustadha Maryam Idris",
    icon: "✍️",
  },
  {
    id: 5,
    title: "Islamic Fiqh — Purification & Prayer",
    subtitle: "Practical Fiqh",
    description:
      "A practical course covering the essential rulings of Taharah and Salah according to the Hanafi madhab, with evidence from Quran and Hadith.",
    category: "Fiqh",
    level: "Beginner",
    duration: "10 weeks",
    sessions: "1x per week",
    teacher: "Ustadh Ibrahim Bello",
    icon: "⚖️",
  },
  {
    id: 6,
    title: "Fiqh of Fasting & Zakat",
    subtitle: "Ibadah Fiqh",
    description:
      "Covers the rulings of Ramadan fasting, Zakat, and their conditions — ideal for students who have completed the Purification & Prayer course.",
    category: "Fiqh",
    level: "Intermediate",
    duration: "8 weeks",
    sessions: "1x per week",
    teacher: "Ustadh Ibrahim Bello",
    icon: "🌙",
  },
  {
    id: 7,
    title: "Seerah: Life of the Prophet ﷺ",
    subtitle: "Prophetic Biography",
    description:
      "An engaging study of the life of Prophet Muhammad ﷺ — from his birth to his passing — drawing lessons for modern Muslim life.",
    category: "Studies",
    level: "All Levels",
    duration: "14 weeks",
    sessions: "1x per week",
    teacher: "Ustadha Fatimah Suleiman",
    icon: "🌟",
    featured: true,
  },
  {
    id: 8,
    title: "Aqeedah: Islamic Creed",
    subtitle: "Foundations of Belief",
    description:
      "A systematic study of the six pillars of Iman based on classical texts, exploring what Muslims believe and why — with emphasis on certainty of faith.",
    category: "Studies",
    level: "Beginner",
    duration: "12 weeks",
    sessions: "1x per week",
    teacher: "Ustadh Ibrahim Bello",
    icon: "🤲",
  },
];

const categories: Category[] = ["All", "Quran", "Arabic", "Fiqh", "Studies"];

const levelColors: Record<Level, string> = {
  "Beginner":     "bg-forest-100 text-forest-700",
  "Intermediate": "bg-gold-100 text-gold-700",
  "Advanced":     "bg-forest-800 text-white",
  "All Levels":   "bg-parchment text-forest-600",
};

export default function CoursesGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section className="bg-cream section-padding">
      <div className="container">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-forest-900 text-white border-forest-900 shadow-sm"
                  : "bg-white text-forest-600 border-parchment hover:border-forest-300 hover:text-forest-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl border border-parchment overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Card top strip — coloured by category */}
              <div
                className={`h-1.5 w-full ${
                  course.category === "Quran"   ? "bg-gradient-to-r from-forest-500 to-forest-700" :
                  course.category === "Arabic"  ? "bg-gradient-to-r from-gold-400 to-gold-600" :
                  course.category === "Fiqh"    ? "bg-gradient-to-r from-forest-700 to-forest-900" :
                                                  "bg-gradient-to-r from-gold-300 to-gold-500"
                }`}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + category */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-forest-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </div>
                  {course.featured && (
                    <span className="bg-gold-100 text-gold-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <p className="text-xs font-medium text-forest-400 uppercase tracking-wide mb-1">
                  {course.subtitle}
                </p>
                <h3 className="font-display text-xl font-semibold text-forest-900 leading-snug mb-3">
                  {course.title}
                </h3>
                <p className="text-forest-600 text-sm leading-relaxed mb-5 flex-1">
                  {course.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`badge ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <span className="badge badge-neutral">{course.duration}</span>
                  <span className="badge badge-neutral">{course.sessions}</span>
                </div>

                {/* Teacher */}
                <div className="flex items-center gap-2.5 pt-4 border-t border-parchment mb-5">
                  <div className="w-7 h-7 rounded-full bg-forest-700 flex items-center justify-center text-white text-xs font-bold">
                    {course.teacher.split(" ").pop()![0]}
                  </div>
                  <p className="text-xs text-forest-500">{course.teacher}</p>
                </div>

                {/* CTA */}
                <Link
                  href="/register"
                  className="btn btn-secondary w-full text-sm group-hover:bg-forest-600 transition-colors"
                >
                  Register to get started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">📚</div>
            <p className="empty-state__text">No courses in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
