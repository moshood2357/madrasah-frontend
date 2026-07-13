"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Calendar } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function RecentAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements/`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setItems(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
        <div className="flex items-center gap-2">
          <Bell size={17} className="text-gold-500" />
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Announcements
          </h2>
        </div>
        <Link
          href="/student/announcements"
          className="text-xs text-gold-600 hover:text-gold-500 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-parchment rounded-lg animate-pulse"
            />
          ))
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-forest-400 text-sm">
            No announcements yet.
          </div>
        ) : (
          items.map((ann, idx) => (
            <Link
              key={ann.id}
              href="/student/announcements"
              className="block announcement-card hover:border-gold-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="announcement-card__title line-clamp-1 flex-1">
                  {ann.title}
                </p>
                {idx === 0 && (
                  <span className="badge badge-warning text-xs flex-shrink-0">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={11} className="text-forest-400" />
                <p className="announcement-card__date">
                  {new Date(ann.created_at).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="announcement-card__content line-clamp-1 text-xs mt-1">
                {ann.content}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
