"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type LinkType = "classroom" | "assignment" | "test";

export interface LinkItem {
  id: number;
  type: LinkType;
  title: string;
  url: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
}

interface Props {
  defaultType: LinkType;
  existing?: LinkItem | null;
  onSuccess: (link: LinkItem) => void;
  onClose: () => void;
}

type Status = "idle" | "loading" | "error";

const typeLabels: Record<LinkType, string> = {
  classroom: "Classroom Link",
  assignment: "Assignment Link",
  test: "Test / Exam Link",
};

export default function LinkForm({
  defaultType,
  existing,
  onSuccess,
  onClose,
}: Props) {
  const [type, setType] = useState<LinkType>(existing?.type ?? defaultType);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [url, setUrl] = useState(existing?.url ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [dueDate, setDueDate] = useState(
    existing?.due_date ? existing.due_date.slice(0, 16) : "",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isEdit = Boolean(existing?.id);
  const token = () => localStorage.getItem("access_token");

  useEffect(() => {
    setType(existing?.type ?? defaultType);
    setTitle(existing?.title ?? "");
    setUrl(existing?.url ?? "");
    setDescription(existing?.description ?? "");
    setDueDate(existing?.due_date ? existing.due_date.slice(0, 16) : "");
    setError("");
    setStatus("idle");
  }, [existing, defaultType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!url.trim()) {
      setError("URL is required.");
      return;
    }

    // Basic URL validation
    try {
      new URL(url.trim());
    } catch {
      setError("Please enter a valid URL including https://");
      return;
    }

    setStatus("loading");

    const endpoint = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/links/${existing!.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/links`;
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        credentials: "include",
        body: JSON.stringify({
          type,
          title: title.trim(),
          url: url.trim(),
          description: description.trim() || null,
          due_date: dueDate || null,
        }),
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

  const showDueDate = type === "assignment" || type === "test";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box animate-scale-in">
        <div className="modal-header">
          <h2 className="font-display text-xl font-semibold text-forest-900">
            {isEdit ? `Edit ${typeLabels[type]}` : `Add ${typeLabels[type]}`}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="alert alert-error mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type selector — only show when creating */}
            {!isEdit && (
              <div className="form-group mb-0">
                <label className="form-label">Link Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["classroom", "assignment", "test"] as LinkType[]).map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          type === t
                            ? "bg-forest-900 text-white border-forest-900"
                            : "bg-white text-forest-600 border-parchment hover:border-forest-300"
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Title */}
            <div className="form-group mb-0">
              <label className="form-label">
                Title <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder={
                  type === "classroom"
                    ? "e.g. Quran Class — Google Meet"
                    : type === "assignment"
                      ? "e.g. Week 3 Arabic Assignment"
                      : "e.g. First Term Fiqh Exam"
                }
                autoFocus
              />
            </div>

            {/* URL */}
            <div className="form-group mb-0">
              <label className="form-label">
                Link URL <span className="text-gold-500">*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="form-input"
                placeholder="https://meet.google.com/abc-defg-hij"
              />
            </div>

            {/* Description */}
            <div className="form-group mb-0">
              <label className="form-label">Description / Instructions</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input resize-none"
                placeholder={
                  type === "classroom"
                    ? "e.g. Every Saturday 10am — 12pm"
                    : type === "assignment"
                      ? "e.g. Complete all 10 questions and submit via Google Forms"
                      : "e.g. 30 minutes — open book allowed"
                }
              />
            </div>

            {/* Due date — only for assignments and tests */}
            {showDueDate && (
              <div className="form-group mb-0">
                <label className="form-label">Due Date / Exam Date</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-input"
                />
              </div>
            )}

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
                  : isEdit
                    ? "Save Changes"
                    : "Add Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
