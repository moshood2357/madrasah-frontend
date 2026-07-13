"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, BarChart2, Search } from "lucide-react";
import ResultForm, { type Result } from "./ResultForm";
import DeleteConfirm from "../anouncements/DeleteConfirm";

const gradeColor = (grade: string) => {
  if (grade === "A+" || grade === "A") return "bg-forest-100 text-forest-700";
  if (grade === "B")  return "bg-gold-100 text-gold-700";
  if (grade === "C")  return "bg-yellow-100 text-yellow-700";
  if (grade === "F")  return "bg-red-100 text-red-600";
  return "badge-neutral";
};

export default function ResultsList() {
  const [results,  setResults]  = useState<Result[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState<Result | null>(null);
  const [deleting, setDeleting] = useState<Result | null>(null);
  const [search,   setSearch]   = useState("");
  const [termFilter, setTermFilter] = useState("All");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/results`, {
      headers: { Authorization: `Bearer ${token()}` },
      credentials: "include",
      cache: "no-store", // Ensure we get the latest results without caching
    })
      .then((r) => r.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []); // ← safe
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  }, []);

  // ── Create / Edit success ──────────────────────────────────────────────────
  const handleSuccess = (result: Result) => {
    if (editing) {
      setResults((prev) => prev.map((r) => r.id === result.id ? result : r));
    } else {
      setResults((prev) => [result, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleting) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/results/${deleting.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` }, credentials: "include", cache: "no-store",
    });
    setResults((prev) => prev.filter((r) => r.id !== deleting.id));
    setDeleting(null);
  };

  // ── Unique terms for filter ────────────────────────────────────────────────
  const terms = ["All", ...Array.from(new Set(results.map((r) => r.term).filter(Boolean)))];

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = results.filter((r) => {
    const matchSearch =
      r.subject?.toLowerCase().includes(search.toLowerCase()) ||
      r.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.term?.toLowerCase().includes(search.toLowerCase());
    const matchTerm = termFilter === "All" || r.term === termFilter;
    return matchSearch && matchTerm;
  });

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">Results</h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Upload and manage student examination results.
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Upload Result
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400" />
          <input
            type="text"
            placeholder="Search student, subject…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 max-w-xs"
          />
        </div>
        <select
          value={termFilter}
          onChange={(e) => setTermFilter(e.target.value)}
          className="form-input w-auto"
        >
          {terms.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-14 bg-parchment rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <BarChart2 size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search || termFilter !== "All"
              ? "No results match your filters."
              : "No results uploaded yet."}
          </p>
          {!search && termFilter === "All" && (
            <button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="mt-4 btn btn-secondary btn-sm"
            >
              Upload First Result
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Term</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <p className="font-medium text-forest-900 text-sm">
                        {r.student_name || `Student #${r.student_id}`}
                      </p>
                    </td>
                    <td className="text-sm text-forest-700">{r.subject}</td>
                    <td>
                      <span className="badge badge-neutral text-xs">{r.term}</span>
                    </td>
                    <td>
                      <span className="font-semibold text-forest-900">{r.score}%</span>
                    </td>
                    <td>
                      <span className={`badge text-sm font-bold ${gradeColor(r.grade)}`}>
                        {r.grade}
                      </span>
                    </td>
                    <td className="text-xs text-forest-500 max-w-[160px] truncate">
                      {r.remarks || "—"}
                    </td>
                    <td className="text-xs text-forest-400">
                      {new Date(r.uploaded_at).toLocaleDateString("en-NG", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditing(r); setShowForm(true); }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleting(r)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-parchment text-xs text-forest-400">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {(search || termFilter !== "All") && " (filtered)"}
          </div>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <ResultForm
          existing={editing}
          onSuccess={handleSuccess}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      )}
      {deleting && (
        <DeleteConfirm
          title="Delete Result?"
          message={`This result for ${deleting.student_name || "this student"} in ${deleting.subject} will be permanently deleted.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
