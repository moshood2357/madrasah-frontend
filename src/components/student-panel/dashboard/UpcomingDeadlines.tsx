"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, FileText, Clock, ExternalLink } from "lucide-react";

interface DeadlineItem {
  id: number;
  type: "assignment" | "test";
  title: string;
  url: string;
  due_date: string | null;
}

export default function UpcomingDeadlines() {
  const [items, setItems] = useState<DeadlineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Fetch assignments and tests together
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/?type=assignment`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      }).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/?type=test`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      }).then((r) => r.json()),
    ])
      .then(([assignments, tests]) => {
        const combined: DeadlineItem[] = [
          ...assignments.map((a: any) => ({ ...a, type: "assignment" })),
          ...tests.map((t: any) => ({ ...t, type: "test" })),
        ];
        // Sort by due_date (soonest first), nulls last
        combined.sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        });
        setItems(combined.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isOverdue = (due: string | null) =>
    due ? new Date(due) < new Date() : false;

  const formatDue = (due: string | null) => {
    if (!due) return "No deadline";
    const d = new Date(due);
    return d.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
        <div className="flex items-center gap-2">
          <Clock size={17} className="text-gold-500" />
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Assignments & Tests
          </h2>
        </div>
        <Link
          href="/student/assignments"
          className="text-xs text-gold-600 hover:text-gold-500 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="p-4 space-y-2">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 bg-parchment rounded-lg animate-pulse"
            />
          ))
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-forest-400 text-sm">
            No assignments or tests posted yet.
          </div>
        ) : (
          items.map((item) => (
            <a
              key={`${item.type}-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-parchment hover:border-gold-300 hover:bg-gold-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === "assignment"
                      ? "bg-forest-100 text-forest-600"
                      : "bg-gold-100 text-gold-600"
                  }`}
                >
                  {item.type === "assignment" ? (
                    <ClipboardList size={16} />
                  ) : (
                    <FileText size={16} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-forest-900 truncate">
                    {item.title}
                  </p>
                  <p
                    className={`text-xs mt-0.5 flex items-center gap-1 ${
                      isOverdue(item.due_date)
                        ? "text-red-500"
                        : "text-forest-400"
                    }`}
                  >
                    <Clock size={10} />
                    {isOverdue(item.due_date) ? "Overdue — " : "Due: "}
                    {formatDue(item.due_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`badge text-xs ${
                    item.type === "assignment"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {item.type}
                </span>
                <ExternalLink
                  size={14}
                  className="text-forest-300 group-hover:text-gold-600 transition-colors"
                />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
