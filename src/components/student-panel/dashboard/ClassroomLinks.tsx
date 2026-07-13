"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, BookOpen } from "lucide-react";

interface ClassroomLink {
  id: number;
  title: string;
  url: string;
  description: string | null;
  type: string;
  created_at: string;
}

export default function ClassroomLinks() {
  const [links, setLinks] = useState<ClassroomLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/?type=classroom`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setLinks(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
        <div className="flex items-center gap-2">
          <BookOpen size={17} className="text-forest-600" />
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Classroom Links
          </h2>
        </div>
        <Link
          href="/student/classroom"
          className="text-xs text-gold-600 hover:text-gold-500 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="p-4 space-y-2">
        {loading ? (
          [1, 2].map((i) => (
            <div
              key={i}
              className="h-14 bg-parchment rounded-lg animate-pulse"
            />
          ))
        ) : links.length === 0 ? (
          <div className="text-center py-8 text-forest-400 text-sm">
            No classroom links posted yet.
          </div>
        ) : (
          links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-parchment hover:border-forest-300 hover:bg-forest-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-forest-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-forest-900 truncate">
                    {link.title}
                  </p>
                  {link.description && (
                    <p className="text-xs text-forest-400 truncate">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>
              <ExternalLink
                size={15}
                className="text-forest-300 group-hover:text-forest-600 flex-shrink-0 transition-colors"
              />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
