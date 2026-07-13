"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AddStudentForm, { type Student } from "./AddStudentForm";
import EditStudentForm from "./EditStudentForm";
import DeleteConfirm from "../anouncements/DeleteConfirm";

type SortKey = "name" | "code" | "class" | "date" | "status";
type SortDir = "asc" | "desc";

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchStudents = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
      headers: { Authorization: `Bearer ${token()}` },
      credentials: "include",
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ── Add success ────────────────────────────────────────────────────────────
  const handleAddSuccess = (student: Student) => {
    setStudents((prev) => [student, ...prev]);
    setShowAdd(false);
  };

  // ── Edit success ───────────────────────────────────────────────────────────
  const handleEditSuccess = (student: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
    setEditing(null);
  };

  // ── Toggle status ──────────────────────────────────────────────────────────
  const handleToggleStatus = async (student: Student) => {
    // Use user.status as the source of truth
    const newStatus = student.user.status === "active" ? "inactive" : "active";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${student.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      },
    );
    if (res.ok) {
      fetchStudents();
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleting) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${deleting.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
        credentials: "include",
      },
    );
    setStudents((prev) => prev.filter((s) => s.id !== deleting.id));
    setDeleting(null);
  };

  // ── Sort handler ───────────────────────────────────────────────────────────
  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === "asc" ? (
        <ChevronUp size={13} />
      ) : (
        <ChevronDown size={13} />
      )
    ) : (
      <ChevronDown size={13} className="opacity-30" />
    );

  // ── Filter + sort — use s.user.status throughout ───────────────────────────
  const filtered = students
    .filter((s) => {
      const matchSearch =
        s.user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        s.user.email.toLowerCase().includes(search.toLowerCase()) ||
        s.student_code?.toLowerCase().includes(search.toLowerCase()) ||
        s.user.phone?.includes(search);
      const matchStatus =
        statusFilter === "all" || s.user.status === statusFilter; // ← s.user.status
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      let va: string, vb: string;
      if (sortKey === "name") {
        va = a.user.full_name;
        vb = b.user.full_name;
      } else if (sortKey === "code") {
        va = a.student_code || "";
        vb = b.student_code || "";
      } else if (sortKey === "class") {
        va = a.class_level || "";
        vb = b.class_level || "";
      } else if (sortKey === "status") {
        va = a.user.status;
        vb = b.user.status;
      } // ← s.user.status
      else {
        va = a.enrolled_at;
        vb = b.enrolled_at;
      }
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  // ── Stats — use s.user.status ──────────────────────────────────────────────
  const activeCount = students.filter((s) => s.user.status === "active").length; // ← s.user.status
  const inactiveCount = students.filter(
    (s) => s.user.status === "inactive",
  ).length; // ← s.user.status

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-900">
            Students
          </h1>
          <p className="text-forest-500 text-sm mt-0.5">
            Manage all registered students.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn btn-secondary btn-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Stats strip */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total",
              value: students.length,
              color: "text-forest-900",
            },
            { label: "Active", value: activeCount, color: "text-forest-600" },
            { label: "Inactive", value: inactiveCount, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-parchment p-4 text-center"
            >
              <p className={`font-display text-2xl font-bold ${color}`}>
                {value}
              </p>
              <p className="text-forest-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400"
          />
          <input
            type="text"
            placeholder="Search name, email, ID, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 min-w-[260px]"
          />
        </div>
        <div className="flex gap-1 bg-forest-50 p-1 rounded-lg">
          {(["all", "active", "inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-white text-forest-900 shadow-sm"
                  : "text-forest-500 hover:text-forest-700"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 bg-parchment rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <Users size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search || statusFilter !== "all"
              ? "No students match your filters."
              : "No students registered yet."}
          </p>
          {!search && statusFilter === "all" && (
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 btn btn-secondary btn-sm"
            >
              Add First Student
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1"
                    >
                      Student <SortIcon k="name" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort("code")}
                      className="flex items-center gap-1"
                    >
                      Student ID <SortIcon k="code" />
                    </button>
                  </th>
                  <th>Phone</th>
                  <th>
                    <button
                      onClick={() => handleSort("class")}
                      className="flex items-center gap-1"
                    >
                      Class <SortIcon k="class" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center gap-1"
                    >
                      Enrolled <SortIcon k="date" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1"
                    >
                      Status <SortIcon k="status" />
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    {/* Student */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {s.user.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-forest-900 text-sm">
                            {s.user.full_name}
                          </p>
                          <p className="text-forest-400 text-xs">
                            {s.user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td>
                      <span className="text-xs font-mono bg-forest-50 text-forest-600 px-2 py-1 rounded">
                        {s.student_code || "—"}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="text-sm text-forest-600">
                      {s.user.phone || "—"}
                    </td>

                    {/* Class */}
                    <td>
                      <span className="badge badge-neutral text-xs">
                        {s.class_level || "General"}
                      </span>
                    </td>

                    {/* Enrolled */}
                    <td className="text-xs text-forest-400">
                      {new Date(s.enrolled_at).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status — s.user.status */}
                    <td>
                      <span
                        className={`badge text-xs ${
                          s.user.status === "active" // ← s.user.status
                            ? "badge-success"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {s.user.status} {/* ← s.user.status */}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditing(s)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Toggle — s.user.status */}
                        <button
                          onClick={() => handleToggleStatus(s)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                            s.user.status === "active" // ← s.user.status
                              ? "text-forest-400 hover:bg-red-50 hover:text-red-500"
                              : "text-forest-400 hover:bg-forest-50 hover:text-forest-600"
                          }`}
                          title={
                            s.user.status === "active"
                              ? "Deactivate"
                              : "Activate"
                          } // ← s.user.status
                        >
                          {s.user.status === "active" ? ( // ← s.user.status
                            <UserX size={14} />
                          ) : (
                            <UserCheck size={14} />
                          )}
                        </button>

                        <button
                          onClick={() => setDeleting(s)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-forest-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
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

          {/* Table footer */}
          <div className="px-6 py-3 border-t border-parchment flex items-center justify-between text-xs text-forest-400">
            <span>
              Showing {filtered.length} of {students.length} student
              {students.length !== 1 ? "s" : ""}
            </span>
            {(search || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="text-gold-600 hover:text-gold-500 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAdd && (
        <AddStudentForm
          onSuccess={handleAddSuccess}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editing && (
        <EditStudentForm
          student={editing}
          onSuccess={handleEditSuccess}
          onClose={() => setEditing(null)}
        />
      )}
      {deleting && (
        <DeleteConfirm
          title="Delete Student?"
          message={`${deleting.user.full_name}'s account and all associated data will be permanently deleted. This cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
