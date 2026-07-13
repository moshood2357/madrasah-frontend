"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCheck, UserX, Clock } from "lucide-react";

interface Student {
  id: number;
  student_code: string;
  status: string;
  enrolled_at: string;
  user: {
    full_name: string;
    email: string;
    phone: string;
    status: string; 
  };
}


interface Props {
  onStatusChange?: () => void; // ← add this
}
export default function RecentStudents({ onStatusChange }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
      cache: "no-store" // ← important to prevent caching
    })
      .then((r) => r.json())
      .then((data) => {
        // Show only the 5 most recent
        setStudents(data.slice(-5).reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggleStatus = async (student: Student) => {
    const token = localStorage.getItem("access_token");
    const newStatus = student.user.status === "active" ? "inactive" : "active";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${student.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      },
    );

    if (res.ok) {
      // Refetch to avoid sort reordering bug
      const token2 = localStorage.getItem("access_token");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
        headers: { Authorization: `Bearer ${token2}` },
        credentials: "include",
      })
        .then((r) => r.json())
        .then((data) =>
          setStudents(Array.isArray(data) ? data.slice(-5).reverse() : []),
        );

      // Tell parent to refresh stats
      onStatusChange?.();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-parchment shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
        <h2 className="font-display text-lg font-semibold text-forest-900">
          Recent Registrations
        </h2>
        <Link
          href="/admin/students"
          className="text-xs text-gold-600 hover:text-gold-500 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-parchment rounded animate-pulse" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state py-12">
          <p className="empty-state__text">No students registered yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Phone</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div>
                      <p className="font-medium text-forest-900 text-sm">
                        {s.user.full_name}
                      </p>
                      <p className="text-forest-400 text-xs">{s.user.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-mono bg-forest-50 text-forest-600 px-2 py-1 rounded">
                      {s.student_code || "—"}
                    </span>
                  </td>
                  <td className="text-sm text-forest-600">{s.user.phone}</td>
                  <td className="text-xs text-forest-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(s.enrolled_at).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        s.user.status === "active"
                          ? "badge-success"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(s)}
                      className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        s.user.status === "active"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-forest-50 text-forest-600 hover:bg-forest-100"
                      }`}
                    >
                      {s.user.status === "active" ? (
                        <>
                          <UserX size={13} /> Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck size={13} /> Activate
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
