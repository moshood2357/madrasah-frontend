"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, FolderOpen, FileText, Download, Search } from "lucide-react";
import ResourceUploadForm, { type Resource } from "./ResourceUploadForm";
import DeleteConfirm from "../anouncements/DeleteConfirm";

const fileIcon = (type: string) => {
  if (type === "pdf")  return "bg-red-50 text-red-500";
  if (type === "docx" || type === "doc") return "bg-blue-50 text-blue-500";
  if (type === "xlsx" || type === "xls") return "bg-green-50 text-green-600";
  return "bg-forest-50 text-forest-500";
};

const fileLabel = (type: string) => type?.toUpperCase() || "FILE";

export default function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [deleting,  setDeleting]  = useState<Resource | null>(null);
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/`, {
      headers: { Authorization: `Bearer ${token()}` }, credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => { setResources(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // ── Upload success ─────────────────────────────────────────────────────────
  const handleSuccess = (resource: Resource) => {
    setResources((prev) => [resource, ...prev]);
    setShowForm(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleting) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/resources/${deleting.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` }, credentials: "include",
      }
    );
    setResources((prev) => prev.filter((r) => r.id !== deleting.id));
    setDeleting(null);
  };

  // ── Unique categories ──────────────────────────────────────────────────────
  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category).filter(Boolean)))];

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = resources.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "All" || r.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">Resources</h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Upload learning materials for students to download.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400" />
          <input
            type="text"
            placeholder="Search resources…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 max-w-xs"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="form-input w-auto"
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Stats strip */}
      {!loading && resources.length > 0 && (
        <div className="flex gap-4 mb-5 text-sm text-forest-500">
          <span>{resources.length} total resources</span>
          <span>·</span>
          <span>{filtered.length} shown</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-32 bg-parchment rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <FolderOpen size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search || catFilter !== "All"
              ? "No resources match your filters."
              : "No resources uploaded yet."}
          </p>
          {!search && catFilter === "All" && (
            <button onClick={() => setShowForm(true)} className="mt-4 btn btn-secondary btn-sm">
              Upload First Resource
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-parchment p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fileIcon(r.file_type)}`}>
                  <FileText size={22} />
                </div>
                <button
                  onClick={() => setDeleting(r)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-forest-300 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Title + meta */}
              <div className="flex-1">
                <p className="font-semibold text-forest-900 text-sm leading-snug line-clamp-2">
                  {r.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-neutral text-xs">{r.category}</span>
                  <span className="text-xs font-mono font-bold text-forest-400">
                    {fileLabel(r.file_type)}
                  </span>
                </div>
                <p className="text-forest-400 text-xs mt-1">
                  {new Date(r.created_at).toLocaleDateString("en-NG", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>

              {/* Download link */}
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${r.id}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-medium text-forest-600 bg-forest-50 hover:bg-forest-100 rounded-lg py-2 transition-colors"
              >
                <Download size={13} /> Preview / Download
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <ResourceUploadForm
          onSuccess={handleSuccess}
          onClose={() => setShowForm(false)}
        />
      )}
      {deleting && (
        <DeleteConfirm
          title="Delete Resource?"
          message={`"${deleting.title}" will be permanently deleted and students will no longer be able to download it.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
