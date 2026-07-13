// AnnouncementList.tsx
// Full list of all announcements with edit + delete actions
// Fetches: GET /api/announcements/
// Delete:  DELETE /api/admin/announcements/:id

"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Bell, Plus } from "lucide-react";
import AnnouncementForm from "./AnnouncementForm";
import DeleteConfirm from "./DeleteConfirm";

import type { Announcement } from "./types";


export default function AnnouncementList() {
  const [items,       setItems]       = useState<Announcement[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [editing,     setEditing]     = useState<Announcement | null>(null);
  const [deleting,    setDeleting]    = useState<Announcement | null>(null);
  const [search,      setSearch]      = useState("");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch all ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements/`, {
      headers:     { Authorization: `Bearer ${token()}` },
      credentials: "include",
      cache:"no-store"
    })
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // ── Create / Edit success ─────────────────────────────────────────────────
  const handleSuccess = (ann: Announcement) => {
    if (editing) {
      // Update in list
      setItems((prev) => prev.map((a) => a.id === ann.id ? ann : a));
    } else {
      // Prepend new
      setItems((prev) => [ann, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleting) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/announcements/${deleting.id}`,
      {
        method:      "DELETE",
        headers:     { Authorization: `Bearer ${token()}` },
        credentials: "include",
      }
    );
    setItems((prev) => prev.filter((a) => a.id !== deleting.id));
    setDeleting(null);
  };

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = items.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">
            Announcements
          </h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Post updates and notices for all students.
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search announcements…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input max-w-sm"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="h-24 bg-parchment rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <Bell size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search ? "No announcements match your search." : "No announcements yet."}
          </p>
          {!search && (
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="mt-4 btn btn-secondary btn-sm"
            >
              Post First Announcement
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-parchment p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left — icon + content */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell size={18} className="text-gold-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-forest-900 text-base leading-snug mb-1">
                      {ann.title}
                    </h3>
                    <p className="text-forest-600 text-sm leading-relaxed line-clamp-2">
                      {ann.content}
                    </p>
                    <p className="text-forest-400 text-xs mt-2">
                      {new Date(ann.created_at).toLocaleDateString("en-NG", {
                        weekday: "short",
                        day:     "numeric",
                        month:   "long",
                        year:    "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setEditing(ann); setShowForm(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(ann)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
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
          {filtered.length} announcement{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>
      )}

      {/* Create / Edit modal */}
      {showForm && (
        <AnnouncementForm
          existing={editing}
          onSuccess={handleSuccess}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {/* Delete confirm modal */}
      {deleting && (
        <DeleteConfirm
          title="Delete Announcement?"
          message={`"${deleting.title}" will be permanently deleted and students will no longer see it.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
