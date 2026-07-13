"use client";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!currentPassword) {
      setMessage("Current password is required.");
      setStatus("error");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.");
      setStatus("error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Password change failed.");
        setStatus("error");
        return;
      }

      setMessage("Password changed successfully.");
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Cannot connect to server.");
      setStatus("error");
    }
  };

  const EyeButton = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 transition-colors"
      tabIndex={-1}
    >
      {show ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );

  return (
    <div className="card max-w-2xl">
      {/* Trick browser autofill into targeting hidden fields instead */}
      <input type="text" style={{ display: "none" }} autoComplete="username" />
      <input
        type="password"
        style={{ display: "none" }}
        autoComplete="current-password"
      />

      <div className="card-header flex items-center gap-3">
        <div className="w-9 h-9 bg-forest-100 rounded-lg flex items-center justify-center">
          <Lock size={18} className="text-forest-600" />
        </div>
        Change Password
      </div>

      <div className="card-body">
        {message && (
          <div
            className={`alert mb-4 text-sm ${
              status === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Current password */}
          <div className="form-group mb-0">
            <label className="form-label">
              Current Password <span className="text-gold-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input pr-11"
                placeholder="Enter your current password"
                autoComplete="new-password" /* blocks browser autofill */
                name="current_password_field"
              />
              <EyeButton
                show={showCurrent}
                onToggle={() => setShowCurrent(!showCurrent)}
              />
            </div>
            <p className="text-forest-400 text-xs mt-1">
              Enter the password you currently use to log in.
            </p>
          </div>

          {/* New password */}
          <div className="form-group mb-0">
            <label className="form-label">
              New Password <span className="text-gold-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input pr-11"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                name="new_password_field"
              />
              <EyeButton show={showNew} onToggle={() => setShowNew(!showNew)} />
            </div>
          </div>

          {/* Confirm password */}
          <div className="form-group mb-0">
            <label className="form-label">
              Confirm New Password <span className="text-gold-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input pr-11"
                placeholder="Re-enter new password"
                autoComplete="new-password"
                name="confirm_password_field"
              />
              <EyeButton
                show={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
              />
            </div>
            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-forest-500 text-xs mt-1 flex items-center gap-1">
                <span>✓</span> Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Lock size={16} />
            {status === "loading" ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
