
"use client";
import { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Award, RefreshCw } from "lucide-react";

interface Result {
  id:          number;
  subject:     string;
  term:        string;
  score:       number;
  grade:       string;
  remarks:     string | null;
  uploaded_at: string;
}

const gradeColor = (grade: string) => {
  if (grade === "A+" || grade === "A") return "bg-forest-100 text-forest-700 border-forest-200";
  if (grade === "B")  return "bg-gold-100 text-gold-700 border-gold-200";
  if (grade === "C")  return "bg-yellow-100 text-yellow-700 border-yellow-200";
  if (grade === "F")  return "bg-red-100 text-red-600 border-red-200";
  return "bg-parchment text-forest-600 border-sand";
};

const scoreBar = (score: number) => {
  if (score >= 80) return "bg-forest-500";
  if (score >= 60) return "bg-gold-500";
  if (score >= 50) return "bg-yellow-400";
  return "bg-red-400";
};

export default function StudentResults() {
  const [results,    setResults]    = useState<Result[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [termFilter, setTermFilter] = useState("All");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results/me`, {
      headers:     { Authorization: `Bearer ${token}` },
      credentials: "include",
      cache:       "no-store",
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setResults(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Could not load results."); setLoading(false); });
  }, [refreshKey]);

  const terms    = ["All", ...Array.from(new Set(results.map((r) => r.term).filter(Boolean)))];
  const filtered = termFilter === "All" ? results : results.filter((r) => r.term === termFilter);
  const avg      = filtered.length ? (filtered.reduce((s, r) => s + r.score, 0) / filtered.length).toFixed(1) : null;
  const best     = filtered.length ? filtered.reduce((a, b) => a.score > b.score ? a : b) : null;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="page-header__title">My Results</h1>
        </div>
        {[1,2,3].map((i) => <div key={i} className="h-20 bg-parchment rounded-xl animate-pulse" />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="page-header__title">My Results</h1>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-header__title">My Results</h1>
          <p className="page-header__subtitle">
            Your examination results and academic progress.
          </p>
        </div>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="btn btn-outline btn-sm flex items-center gap-2 flex-shrink-0"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Term filter */}
      {terms.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {terms.map((t) => (
            <button
              key={t}
              onClick={() => setTermFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                termFilter === t
                  ? "bg-forest-900 text-white border-forest-900"
                  : "bg-white text-forest-600 border-parchment hover:border-forest-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Summary cards */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-parchment p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center text-forest-600">
              <BarChart2 size={20} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-forest-900">{avg}%</p>
              <p className="text-forest-400 text-xs">Average Score</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-parchment p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-forest-900">{filtered.length}</p>
              <p className="text-forest-400 text-xs">Subjects Recorded</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-parchment p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center text-forest-600">
              <Award size={20} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-forest-900">{best?.grade ?? "—"}</p>
              <p className="text-forest-400 text-xs">Best Grade</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <BarChart2 size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {termFilter !== "All"
              ? `No results for ${termFilter}.`
              : "No results uploaded yet. Check back after your examinations."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-parchment p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-forest-900 text-base">{r.subject}</h3>
                  <p className="text-forest-400 text-xs mt-0.5">{r.term}</p>
                </div>
                <span className={`badge border font-bold text-base px-3 py-1 ${gradeColor(r.grade)}`}>
                  {r.grade}
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-forest-500 mb-1.5">
                  <span>Score</span>
                  <span className="font-semibold text-forest-900">{r.score}%</span>
                </div>
                <div className="w-full h-2.5 bg-parchment rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${scoreBar(r.score)}`}
                    style={{ width: `${r.score}%` }}
                  />
                </div>
              </div>

              {/* Remarks + date */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-parchment">
                {r.remarks
                  ? <p className="text-forest-500 text-xs italic">"{r.remarks}"</p>
                  : <span />
                }
                <p className="text-forest-400 text-xs">
                  {new Date(r.uploaded_at).toLocaleDateString("en-NG", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
