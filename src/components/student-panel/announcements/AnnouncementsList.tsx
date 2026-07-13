"use client";
import { useEffect, useState } from "react";
import { Bell, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Announcement {
  id:         number;
  title:      string;
  content:    string;
  created_at: string;
}

export default function AnnouncementsList() {
  const [items,   setItems]   = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements/`, {
      headers:     { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => {
        setError("Could not load announcements. Please try again.");
        setLoading(false);
      });
  }, []);

  const filtered = items.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: number) =>
    setExpanded((prev) => (prev === id ? null : id));

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="page-header">
          <h1 className="page-header__title">Announcements</h1>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-parchment rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="space-y-4">
        <div className="page-header">
          <h1 className="page-header__title">Announcements</h1>
        </div>
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="page-header mb-0">
        <h1 className="page-header__title">Announcements</h1>
        <p className="page-header__subtitle">
          Stay up to date with the latest news from Dar Al-Arqam Global Institute.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <input
          type="text"
          placeholder="Search announcements…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <Bell size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search
              ? `No announcements match "${search}".`
              : "No announcements yet. Check back soon."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ann, idx) => {
            const isOpen    = expanded === ann.id;
            const isNew     = idx === 0; // most recent is "new"
            const dateStr   = new Date(ann.created_at).toLocaleDateString("en-NG", {
              weekday: "short",
              day:     "numeric",
              month:   "long",
              year:    "numeric",
            });

            return (
              <div
                key={ann.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-gold-300 shadow-md"
                    : "border-parchment hover:border-forest-200 hover:shadow-sm"
                }`}
              >
                {/* Accent strip on newest */}
                {isNew && (
                  <div className="h-1 bg-gradient-to-r from-gold-400 to-gold-500" />
                )}

                {/* Header row — always visible */}
                <button
                  onClick={() => toggle(ann.id)}
                  className="w-full flex items-start gap-4 px-6 py-5 text-left"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isNew ? "bg-gold-100 text-gold-600" : "bg-forest-50 text-forest-500"
                  }`}>
                    <Bell size={18} />
                  </div>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-forest-900 text-base leading-snug">
                        {ann.title}
                      </h3>
                      {isNew && (
                        <span className="badge badge-warning text-xs">New</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-forest-400 text-xs">
                      <Calendar size={12} />
                      {dateStr}
                    </div>
                    {/* Preview when collapsed */}
                    {!isOpen && (
                      <p className="text-forest-500 text-sm mt-1.5 line-clamp-1">
                        {ann.content}
                      </p>
                    )}
                  </div>

                  {/* Expand icon */}
                  <div className="flex-shrink-0 text-forest-400 mt-1">
                    {isOpen
                      ? <ChevronUp size={18} />
                      : <ChevronDown size={18} />
                    }
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-down">
                    <div className="border-t border-parchment pt-4">
                      <p className="text-forest-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {ann.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Count */}
      {filtered.length > 0 && (
        <p className="text-forest-400 text-xs text-right">
          {filtered.length} announcement{filtered.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
