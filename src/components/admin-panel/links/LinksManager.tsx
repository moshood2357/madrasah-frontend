"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  ClipboardList,
  FileText,
  ExternalLink,
  Search,
} from "lucide-react";
import LinkForm, { type LinkItem, type LinkType } from "./LinkForm";
import DeleteConfirm from "../anouncements/DeleteConfirm";

const tabs: { id: LinkType; label: string; icon: React.ReactNode }[] = [
  { id: "classroom", label: "Classroom Links", icon: <BookOpen size={16} /> },
  { id: "assignment", label: "Assignments", icon: <ClipboardList size={16} /> },
  { id: "test", label: "Tests & Exams", icon: <FileText size={16} /> },
];

const typeColor = (type: LinkType) => {
  if (type === "classroom") return "bg-forest-100 text-forest-700";
  if (type === "assignment") return "bg-gold-100 text-gold-700";
  return "bg-blue-50 text-blue-600";
};

const typeBorder = (type: LinkType) => {
  if (type === "classroom") return "border-forest-200 hover:border-forest-300";
  if (type === "assignment") return "border-gold-200 hover:border-gold-300";
  return "border-blue-100 hover:border-blue-200";
};

export default function LinksManager() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LinkType>("classroom");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LinkItem | null>(null);
  const [deleting, setDeleting] = useState<LinkItem | null>(null);
  const [search, setSearch] = useState("");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch all links ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/links`, {
      headers: { Authorization: `Bearer ${token()}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setLinks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ── Create / Edit success ──────────────────────────────────────────────────
  const handleSuccess = (link: LinkItem) => {
    if (editing) {
      setLinks((prev) => prev.map((l) => (l.id === link.id ? link : l)));
    } else {
      setLinks((prev) => [link, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
    setActiveTab(link.type); // switch to the tab of the new/edited link
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleting) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/links/${deleting.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
        credentials: "include",
      },
    );
    setLinks((prev) => prev.filter((l) => l.id !== deleting.id));
    setDeleting(null);
  };

  // ── Filtered by tab + search ───────────────────────────────────────────────
  const filtered = links.filter((l) => {
    const matchTab = l.type === activeTab;
    const matchSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // ── Tab counts ─────────────────────────────────────────────────────────────
  const count = (type: LinkType) => links.filter((l) => l.type === type).length;

  const formatDate = (d: string | null) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOverdue = (d: string | null) =>
    d ? new Date(d) < new Date() : false;

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">
            Links
          </h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Manage classroom links, assignments, and test links for students.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Link
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-forest-50 p-1 rounded-xl w-fit mb-6">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              setSearch("");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? "bg-white text-forest-900 shadow-sm"
                : "text-forest-500 hover:text-forest-700"
            }`}
          >
            {icon}
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === id
                  ? "bg-forest-100 text-forest-600"
                  : "bg-forest-100/50 text-forest-400"
              }`}
            >
              {count(id)}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400"
        />
        <input
          type="text"
          placeholder={`Search ${activeTab} links…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input pl-9"
        />
      </div>

      {/* Links list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-parchment rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          {activeTab === "classroom" && (
            <BookOpen size={40} className="text-forest-200 mb-3" />
          )}
          {activeTab === "assignment" && (
            <ClipboardList size={40} className="text-forest-200 mb-3" />
          )}
          {activeTab === "test" && (
            <FileText size={40} className="text-forest-200 mb-3" />
          )}
          <p className="empty-state__text text-forest-400">
            {search
              ? `No ${activeTab} links match "${search}".`
              : `No ${activeTab} links added yet.`}
          </p>
          {!search && (
            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="mt-4 btn btn-secondary btn-sm"
            >
              Add First {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
              Link
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm ${typeBorder(link.type)}`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${typeColor(link.type)}`}
                  >
                    {link.type === "classroom" && <BookOpen size={18} />}
                    {link.type === "assignment" && <ClipboardList size={18} />}
                    {link.type === "test" && <FileText size={18} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-forest-900 text-sm">
                        {link.title}
                      </h3>
                      <span className={`badge text-xs ${typeColor(link.type)}`}>
                        {link.type}
                      </span>
                    </div>

                    {link.description && (
                      <p className="text-forest-500 text-xs mt-1 line-clamp-1">
                        {link.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {/* URL preview */}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gold-600 hover:text-gold-500 transition-colors"
                      >
                        <ExternalLink size={11} />
                        <span className="truncate max-w-[200px]">
                          {link.url}
                        </span>
                      </a>

                      {/* Due date */}
                      {link.due_date && (
                        <span
                          className={`text-xs flex items-center gap-1 ${
                            isOverdue(link.due_date)
                              ? "text-red-500"
                              : "text-forest-400"
                          }`}
                        >
                          {isOverdue(link.due_date) ? "⚠ Overdue:" : "Due:"}
                          {formatDate(link.due_date)}
                        </span>
                      )}

                      {/* Added date */}
                      <span className="text-forest-300 text-xs">
                        Added{" "}
                        {new Date(link.created_at).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditing(link);
                      setShowForm(true);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleting(link)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {!loading && filtered.length > 0 && (
        <p className="text-forest-400 text-xs mt-4 text-right">
          {filtered.length} {activeTab} link{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Modals */}
      {showForm && (
        <LinkForm
          defaultType={activeTab}
          existing={editing}
          onSuccess={handleSuccess}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
      {deleting && (
        <DeleteConfirm
          title="Delete Link?"
          message={`"${deleting.title}" will be permanently deleted and students will no longer see it.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
