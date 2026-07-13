"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { Student } from "./AddStudentForm";

interface Props {
  student: Student;
  onSuccess: (student: Student) => void;
  onClose: () => void;
}

type Status = "idle" | "loading" | "error";

const classLevels = [
  "General",
  "Beginners",
  "Elementary",
  "Intermediate",
  "Advanced",
  "Quran Class",
  "Arabic Class",
  "Fiqh Class",
  "Hifz Programme",
  "Adults Class",
];

export default function EditStudentForm({
  student,
  onSuccess,
  onClose,
}: Props) {
  const [fullName, setFullName] = useState(student.user.full_name);
  const [phone, setPhone] = useState(student.user.phone || "");
  const [classLevel, setClassLevel] = useState(
    student.class_level || "General",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const token = () => localStorage.getItem("access_token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${student.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
          credentials: "include",
          body: JSON.stringify({
            full_name: fullName.trim(),
            phone: phone.trim(),
            class_level: classLevel,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update failed.");
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
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box animate-scale-in">
        <div className="modal-header">
          <h2 className="font-display text-xl font-semibold text-forest-900">
            Edit Student
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
            <div className="form-group mb-0">
              <label className="form-label">
                Full Name <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                autoFocus
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={student.user.email}
                disabled
                className="form-input opacity-60 cursor-not-allowed"
              />
              <p className="text-forest-400 text-xs mt-1">
                Email cannot be changed.
              </p>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="+234 800 000 0000"
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="form-input"
              >
                {classLevels.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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
                {status === "loading" ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
