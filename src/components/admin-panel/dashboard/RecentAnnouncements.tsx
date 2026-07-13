"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

interface Announcement {
  id:         number;
  title:      string;
  content:    string;
  created_at: string;
}

export default function RecentAnnouncements() {
  const [items,   setItems]   = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements/`, {
      headers:     { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => { setItems(data.slice(0, 4)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
        <h2 className="font-display text-lg font-semibold text-forest-900">
          Recent Announcements
        </h2>
        <Link
          href="/admin/announcements"
          className="text-xs text-gold-600 hover:text-gold-500 font-medium transition-colors"
        >
          Manage →
        </Link>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          [1,2,3].map((i) => (
            <div key={i} className="h-14 bg-parchment rounded-lg animate-pulse" />
          ))
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-forest-400 text-sm">
            No announcements yet.{" "}
            <Link href="/admin/announcements" className="text-gold-600 underline">
              Post one now
            </Link>
          </div>
        ) : (
          items.map((ann) => (
            <div key={ann.id} className="announcement-card">
              <div className="flex items-start gap-3">
                <Bell size={15} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="announcement-card__title truncate">{ann.title}</p>
                  <p className="announcement-card__date">
                    {new Date(ann.created_at).toLocaleDateString("en-NG", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                  <p className="announcement-card__content line-clamp-1 text-xs mt-1">
                    {ann.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
