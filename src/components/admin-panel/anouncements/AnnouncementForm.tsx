// AnnouncementForm.tsx
// Modal form for creating and editing announcements
// POST /api/admin/announcements  (create)
// PATCH /api/admin/announcements/:id (edit)

"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Announcement, AnnouncementDraft } from "./types";

// interface Announcement {
//   id?:        number;
//   title:      string;
//   content:    string;
//   created_at?: string;
// }

interface Props {
  existing?: AnnouncementDraft | null; // uses draft (id is optional)
  onSuccess: (ann: Announcement) => void;
  onClose: () => void;
}

type Status = "idle" | "loading" | "error";

export default function AnnouncementForm({ existing, onSuccess, onClose }: Props) {
  const [title,   setTitle]   = useState(existing?.title   ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [status,  setStatus]  = useState<Status>("idle");
  const [error,   setError]   = useState("");

  // Keep form in sync if existing changes
  useEffect(() => {
    setTitle(existing?.title   ?? "");
    setContent(existing?.content ?? "");
    setError("");
    setStatus("idle");
  }, [existing]);

  const isEdit = Boolean(existing?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim())   { setError("Title is required.");   return; }
    if (!content.trim()) { setError("Content is required."); return; }

    setStatus("loading");
    const token = localStorage.getItem("access_token");

    const url    = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/announcements/${existing!.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/announcements`;
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res  = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      onSuccess(data);
    } catch {
      setError("Cannot connect to server.");
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box animate-scale-in">
        {/* Header */}
        <div className="modal-header">
          <h2 className="font-display text-xl font-semibold text-forest-900">
            {isEdit ? "Edit Announcement" : "New Announcement"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 hover:text-forest-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {error && (
            <div className="alert alert-error mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="form-group mb-0">
              <label className="form-label" htmlFor="ann-title">
                Title <span className="text-gold-500">*</span>
              </label>
              <input
                id="ann-title"
                type="text"
                placeholder="e.g. Ramadan Class Schedule Update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                autoFocus
              />
            </div>

            {/* Content */}
            <div className="form-group mb-0">
              <label className="form-label" htmlFor="ann-content">
                Content <span className="text-gold-500">*</span>
              </label>
              <textarea
                id="ann-content"
                rows={6}
                placeholder="Write your announcement here…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-input resize-none"
              />
              <p className="text-forest-400 text-xs mt-1">
                {content.length} characters
              </p>
            </div>

            {/* Footer */}
            <div className="modal-footer px-0 pb-0 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-secondary btn-sm"
              >
                {status === "loading"
                  ? "Saving…"
                  : isEdit ? "Save Changes" : "Post Announcement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
