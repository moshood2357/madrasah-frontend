"use client";
import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export interface Student {
  id: number;
  student_code: string;
  class_level: string;
  status: string;
  enrolled_at: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  };
}

interface Props {
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

export default function AddStudentForm({ onSuccess, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [classLevel, setClassLevel] = useState("General");
  const [password, setPassword] = useState("Student@123");
  const [showPass, setShowPass] = useState(false);
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
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
          credentials: "include",
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            class_level: classLevel,
            password: password,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add student.");
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
            Add New Student
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
            {/* Full name */}
            <div className="form-group mb-0">
              <label className="form-label">
                Full Name <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                placeholder="e.g. Abdullahi Musa"
                autoFocus
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">
                  Email <span className="text-gold-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="student@email.com"
                />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">
                  Phone <span className="text-gold-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>

            {/* Class level */}
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

            {/* Password */}
            <div className="form-group mb-0">
              <label className="form-label">
                Default Password <span className="text-gold-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-11"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <p className="text-forest-400 text-xs mt-1">
                Student will use this to log in. Share it with them securely.
              </p>
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
                {status === "loading" ? "Adding…" : "Add Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
