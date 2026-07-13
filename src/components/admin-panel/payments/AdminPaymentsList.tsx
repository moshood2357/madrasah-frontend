"use client";
import { useEffect, useState } from "react";
import { CreditCard, Search, Plus, X } from "lucide-react";

interface Payment {
  id: number;
  student_id: number;
  student_name: string | null; // ← added
  amount: number;
  reference: string;
  status: string;
  method: string;
  description: string | null;
  paid_at: string | null;
  created_at: string;
}

interface Student {
  id: number;
  student_code: string;
  user: { full_name: string; email: string };
}

type Status = "idle" | "loading" | "error";

const statusColor = (s: string) => {
  if (s === "success") return "badge-success";
  if (s === "pending") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-600";
};

const methodLabel = (m: string) => (m === "paystack" ? "Paystack" : "Manual");

export default function AdminPaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showManual, setShowManual] = useState(false);

  const [manualStudentId, setManualStudentId] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [manualDesc, setManualDesc] = useState("");
  const [manualStatus, setManualStatus] = useState<Status>("idle");
  const [manualError, setManualError] = useState("");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/payments`, {
        headers: { Authorization: `Bearer ${token()}` },
        credentials: "include",
      }).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
        headers: { Authorization: `Bearer ${token()}` },
        credentials: "include",
      }).then((r) => r.json()),
    ])
      .then(([paymentsData, studentsData]) => {
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ── Student name — use student_name from API, fallback to local lookup ─────
  const getStudentName = (p: Payment) => {
    if (p.student_name) return p.student_name;
    const s = students.find((s) => s.id === p.student_id);
    return s ? s.user.full_name : `Student #${p.student_id}`;
  };

  // ── Manual payment submit ──────────────────────────────────────────────────
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualError("");

    if (!manualStudentId) {
      setManualError("Please select a student.");
      return;
    }
    if (!manualAmount || parseFloat(manualAmount) <= 0) {
      setManualError("Enter a valid amount.");
      return;
    }

    setManualStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
          credentials: "include",
          body: JSON.stringify({
            student_id: parseInt(manualStudentId),
            amount: parseFloat(manualAmount),
            description: manualDesc || "Manual payment",
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setManualError(data.error || "Failed.");
        setManualStatus("error");
        return;
      }

      // Attach student name from local list if API doesn't return it
      const student = students.find((s) => s.id === parseInt(manualStudentId));
      setPayments((prev) => [
        {
          ...data,
          student_name: data.student_name || student?.user.full_name || null,
        },
        ...prev,
      ]);
      setShowManual(false);
      setManualStudentId("");
      setManualAmount("");
      setManualDesc("");
      setManualStatus("idle");
    } catch {
      setManualError("Cannot connect to server.");
      setManualStatus("error");
    }
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalPaid = payments
    .filter((p) => p.status === "success")
    .reduce((s, p) => s + p.amount, 0);
  const totalCount = payments.length;
  const successCount = payments.filter((p) => p.status === "success").length;

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = payments.filter((p) => {
    const name = getStudentName(p).toLowerCase();
    const matchSearch =
      name.includes(search.toLowerCase()) ||
      p.reference?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">
            Payments
          </h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Track all student payments and record manual transactions.
          </p>
        </div>
        <button
          onClick={() => setShowManual(true)}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Record Manual Payment
        </button>
      </div>

      {/* Stats strip */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total Collected",
              value: `₦${totalPaid.toLocaleString()}`,
              color: "text-forest-900",
            },
            {
              label: "Total Transactions",
              value: totalCount,
              color: "text-forest-900",
            },
            {
              label: "Successful",
              value: successCount,
              color: "text-forest-600",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-parchment p-5"
            >
              <p className={`font-display text-2xl font-bold ${color}`}>
                {value}
              </p>
              <p className="text-forest-400 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400"
          />
          <input
            type="text"
            placeholder="Search student, reference, description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 max-w-xs"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input w-auto"
        >
          {["All", "success", "pending", "failed"].map((s) => (
            <option key={s} value={s}>
              {s === "All"
                ? "All Status"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 bg-parchment rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <CreditCard size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            No payments found.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Reference</th>
                  <th>Method</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    {/* Student name — from API or fallback lookup */}
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-forest-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getStudentName(p).charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-forest-900 text-sm">
                          {getStudentName(p)}
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-forest-900">
                      ₦{p.amount.toLocaleString()}
                    </td>
                    <td>
                      <span className="text-xs font-mono text-forest-500 bg-forest-50 px-2 py-1 rounded">
                        {p.reference?.slice(0, 16)}…
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge text-xs ${p.method === "paystack" ? "badge-success" : "badge-neutral"}`}
                      >
                        {methodLabel(p.method)}
                      </span>
                    </td>
                    <td className="text-sm text-forest-500 max-w-[150px] truncate">
                      {p.description || "—"}
                    </td>
                    <td className="text-xs text-forest-400">
                      {p.paid_at
                        ? new Date(p.paid_at).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td>
                      <span
                        className={`badge text-xs ${statusColor(p.status)}`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-parchment text-xs text-forest-400">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {/* Manual payment modal */}
      {showManual && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowManual(false);
          }}
        >
          <div className="modal-box animate-scale-in">
            <div className="modal-header">
              <h2 className="font-display text-xl font-semibold text-forest-900">
                Record Manual Payment
              </h2>
              <button
                onClick={() => setShowManual(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {manualError && (
                <div className="alert alert-error mb-4 text-sm">
                  {manualError}
                </div>
              )}
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="form-group mb-0">
                  <label className="form-label">
                    Student <span className="text-gold-500">*</span>
                  </label>
                  <select
                    value={manualStudentId}
                    onChange={(e) => setManualStudentId(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select student…</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.user.full_name} — {s.student_code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">
                    Amount (₦) <span className="text-gold-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="form-input"
                    min="1"
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. First term fee — bank transfer"
                    value={manualDesc}
                    onChange={(e) => setManualDesc(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="modal-footer px-0 pb-0 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowManual(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={manualStatus === "loading"}
                    className="btn btn-secondary btn-sm"
                  >
                    {manualStatus === "loading" ? "Saving…" : "Record Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
