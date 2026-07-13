"use client";
import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  FileText,
  ExternalLink,
  Clock,
  Search,
} from "lucide-react";

type LinkType = "classroom" | "assignment" | "test";

interface LinkItem {
  id: number;
  type: LinkType;
  title: string;
  url: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
}

interface Props {
  type: LinkType;
  title: string;
  desc: string;
}

const typeStyles = {
  classroom: {
    icon: BookOpen,
    color: "bg-forest-100 text-forest-700",
    border: "border-forest-200 hover:border-forest-400",
    btn: "bg-forest-900 hover:bg-forest-700 text-white",
  },
  assignment: {
    icon: ClipboardList,
    color: "bg-gold-100 text-gold-700",
    border: "border-gold-200 hover:border-gold-400",
    btn: "bg-gold-500 hover:bg-gold-400 text-forest-900",
  },
  test: {
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100 hover:border-blue-300",
    btn: "bg-blue-600 hover:bg-blue-500 text-white",
  },
};

export default function StudentLinks({ type, title, desc }: Props) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const styles = typeStyles[type];
  const Icon = styles.icon;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
      cache: "no-store", // Ensure we get the latest links without caching
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setLinks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load links.");
        setLoading(false);
      });
  }, [type]);

  const filtered = links.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const isOverdue = (d: string | null) =>
    d ? new Date(d) < new Date() : false;

  const formatDate = (d: string | null) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="page-header">
          <h1 className="page-header__title">{title}</h1>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-parchment rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="page-header mb-0">
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__subtitle">{desc}</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Search */}
      {links.length > 3 && (
        <div className="relative max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400"
          />
          <input
            type="text"
            placeholder={`Search ${type} links…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>
      )}

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <Icon size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search
              ? `No results for "${search}".`
              : `No ${type} links posted yet. Check back soon.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-2xl border p-6 transition-all duration-200 hover:shadow-md ${styles.border}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.color}`}
                >
                  <Icon size={22} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-forest-900 text-base leading-snug">
                    {link.title}
                  </h3>

                  {link.description && (
                    <p className="text-forest-600 text-sm mt-1 leading-relaxed">
                      {link.description}
                    </p>
                  )}

                  {/* Due date */}
                  {link.due_date && (
                    <div
                      className={`flex items-center gap-1.5 mt-2 text-xs font-medium ${
                        isOverdue(link.due_date)
                          ? "text-red-500"
                          : "text-forest-500"
                      }`}
                    >
                      <Clock size={12} />
                      {isOverdue(link.due_date) ? "Overdue — " : "Due: "}
                      {formatDate(link.due_date)}
                    </div>
                  )}

                  {/* Added date */}
                  <p className="text-forest-300 text-xs mt-1">
                    Posted{" "}
                    {new Date(link.created_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* Open button */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${styles.btn}`}
                  >
                    <ExternalLink size={14} />
                    {type === "classroom"
                      ? "Join Class"
                      : type === "assignment"
                        ? "Open Assignment"
                        : "Start Test / Exam"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {filtered.length > 0 && (
        <p className="text-forest-400 text-xs text-right">
          {filtered.length} {type} link{filtered.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
