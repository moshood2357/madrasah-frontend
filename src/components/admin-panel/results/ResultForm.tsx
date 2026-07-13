"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface Result {
  id: number;
  student_id: number;
  subject: string;
  term: string;
  score: number;
  grade: string;
  remarks: string | null;
  uploaded_at: string;
  student_name?: string;
}

interface Student {
  id: number;
  student_code: string;
  user: { full_name: string };
}

interface Props {
  existing?: Result | null;
  onSuccess: (result: Result) => void;
  onClose: () => void;
}

type Status = "idle" | "loading" | "error";

// Auto-compute grade from score
function computeGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export default function ResultForm({ existing, onSuccess, onClose }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState(
    existing?.student_id?.toString() ?? "",
  );
  const [subject, setSubject] = useState(existing?.subject ?? "");
  const [term, setTerm] = useState(existing?.term ?? "");
  const [score, setScore] = useState(existing?.score?.toString() ?? "");
  const [grade, setGrade] = useState(existing?.grade ?? "");
  const [remarks, setRemarks] = useState(existing?.remarks ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const token = () => localStorage.getItem("access_token");
  const isEdit = Boolean(existing?.id);

  // Auto-update grade when score changes
  useEffect(() => {
    const n = parseFloat(score);
    if (!isNaN(n)) setGrade(computeGrade(n));
  }, [score]);

  // Fetch students for dropdown
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
      headers: { Authorization: `Bearer ${token()}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setStudents)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!studentId) {
      setError("Please select a student.");
      return;
    }
    if (!subject.trim()) {
      setError("Subject is required.");
      return;
    }
    if (!term.trim()) {
      setError("Term is required.");
      return;
    }
    if (score === "") {
      setError("Score is required.");
      return;
    }

    const n = parseFloat(score);
    if (isNaN(n) || n < 0 || n > 100) {
      setError("Score must be a number between 0 and 100.");
      return;
    }

    setStatus("loading");

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/results/${existing!.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/results`;
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        credentials: "include",
        body: JSON.stringify({
          student_id: parseInt(studentId),
          subject: subject.trim(),
          term: term.trim(),
          score: n,
          grade: grade,
          remarks: remarks.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      // Attach student name for display
      const student = students.find((s) => s.id === parseInt(studentId));
      onSuccess({ ...data, student_name: student?.user.full_name });
    } catch {
      setError("Cannot connect to server.");
      setStatus("error");
    }
  };

  const terms = [
    "First Term 2025/2026",
    "Second Term 2025/2026",
    "Third Term 2025/2026",
    "First Term 2026/2027",
    "Second Term 2026/2027",
    "Third Term 2026/2027",
  ];

  const subjects = [
    "Quran Recitation",
    "Tajweed",
    "Hifz",
    "Arabic Language",
    "Islamic Studies",
    "Fiqh",
    "Aqeedah",
    "Hadith",
    "Seerah",
    "Islamic Manners",
  ];

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
            {isEdit ? "Edit Result" : "Upload Result"}
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
            {/* Student */}
            <div className="form-group mb-0">
              <label className="form-label">
                Student <span className="text-gold-500">*</span>
              </label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="form-input"
                disabled={isEdit}
              >
                <option value="">Select a student…</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.user.full_name} — {s.student_code}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject + Term row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">
                  Subject <span className="text-gold-500">*</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select subject…</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">
                  Term <span className="text-gold-500">*</span>
                </label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select term…</option>
                  {terms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Score + Grade row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">
                  Score (0–100) <span className="text-gold-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 85"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Grade (auto)</label>
                <div
                  className={`form-input flex items-center font-bold text-lg ${
                    grade === "A+" || grade === "A"
                      ? "text-forest-600"
                      : grade === "B"
                        ? "text-gold-600"
                        : grade === "C"
                          ? "text-yellow-600"
                          : grade === "F"
                            ? "text-red-500"
                            : "text-forest-500"
                  }`}
                >
                  {grade || "—"}
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="form-group mb-0">
              <label className="form-label">Remarks (optional)</label>
              <input
                type="text"
                placeholder="e.g. Excellent performance, keep it up"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="form-input"
              />
            </div>

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
                    : "Upload Result"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
