"use client";
import { useState, useRef } from "react";
import { X, UploadCloud, FileText } from "lucide-react";

export interface Resource {
  id:         number;
  title:      string;
  category:   string;
  file_url:   string;
  file_type:  string;
  created_at: string;
}

interface Props {
  onSuccess: (resource: Resource) => void;
  onClose:   () => void;
}

type Status = "idle" | "loading" | "error";

const categories = [
  "General",
  "Quran & Tajweed",
  "Hifz",
  "Arabic Language",
  "Islamic Studies",
  "Fiqh",
  "Aqeedah",
  "Hadith",
  "Seerah",
  "Assignments",
  "Exam Papers",
];

export default function ResourceUploadForm({ onSuccess, onClose }: Props) {
  const [title,    setTitle]    = useState("");
  const [category, setCategory] = useState("General");
  const [file,     setFile]     = useState<File | null>(null);
  const [status,   setStatus]   = useState<Status>("idle");
  const [error,    setError]    = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const token = () => localStorage.getItem("access_token");

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (f: File) => {
    if (!allowedTypes.includes(f.type)) {
      setError("Only PDF, Word, and Excel files are allowed.");
      return;
    }
    if (f.size > 16 * 1024 * 1024) {
      setError("File size must be under 16 MB.");
      return;
    }
    setError("");
    setFile(f);
    // Auto-fill title from filename if empty
    if (!title) {
      setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) { setError("Title is required.");        return; }
    if (!file)         { setError("Please select a file.");     return; }

    setStatus("loading");

    const formData = new FormData();
    formData.append("title",    title.trim());
    formData.append("category", category);
    formData.append("file",     file);

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/resources`,
        {
          method:      "POST",
          headers:     { Authorization: `Bearer ${token()}` },
          credentials: "include",
          body:        formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        setStatus("error");
        return;
      }

      onSuccess(data);
    } catch {
      setError("Cannot connect to server.");
      setStatus("error");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024)         return `${bytes} B`;
    if (bytes < 1024 * 1024)  return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box animate-scale-in">
        {/* Header */}
        <div className="modal-header">
          <h2 className="font-display text-xl font-semibold text-forest-900">
            Upload Resource
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? "border-gold-400 bg-gold-50"
                  : file
                  ? "border-forest-300 bg-forest-50"
                  : "border-parchment hover:border-forest-300 hover:bg-forest-50"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                    <FileText size={24} className="text-forest-600" />
                  </div>
                  <p className="font-medium text-forest-900 text-sm">{file.name}</p>
                  <p className="text-forest-400 text-xs">{formatSize(file.size)}</p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-xs text-red-500 hover:text-red-600 underline mt-1"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud size={32} className="text-forest-300" />
                  <p className="text-forest-600 text-sm font-medium">
                    Drag & drop or click to select
                  </p>
                  <p className="text-forest-400 text-xs">
                    PDF, Word, Excel — max 16 MB
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="form-group mb-0">
              <label className="form-label">
                Title <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tajweed Rules — Beginner Level"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Category */}
            <div className="form-group mb-0">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="modal-footer px-0 pb-0 pt-2">
              <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-secondary btn-sm"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="spinner w-4 h-4 border-white/30 border-t-white" />
                    Uploading…
                  </span>
                ) : "Upload Resource"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
