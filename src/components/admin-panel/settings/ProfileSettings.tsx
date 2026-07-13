"use client";
import { useState, useEffect } from "react";
import { User, Save } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ProfileSettings() {
  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [status,   setStatus]   = useState<Status>("idle");
  const [message,  setMessage]  = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      const user = JSON.parse(raw);
      setFullName(user.full_name || "");
      setEmail(user.email      || "");
      setPhone(user.phone      || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!fullName.trim()) { setMessage("Full name is required."); setStatus("error"); return; }

    setStatus("loading");
    const token = localStorage.getItem("access_token");

    try {
      const raw  = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      if (!user?.id) throw new Error("User not found");

      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/profile`,
        {
          method:      "PATCH",
          headers:     { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          credentials: "include",
          body: JSON.stringify({ full_name: fullName.trim(), phone: phone.trim() }),
        }
      );

      const data = await res.json();
      if (!res.ok) { setMessage(data.error || "Update failed."); setStatus("error"); return; }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify({ ...user, full_name: fullName, phone }));
      setMessage("Profile updated successfully.");
      setStatus("success");
    } catch {
      setMessage("Cannot connect to server.");
      setStatus("error");
    }
  };

  return (
    <div className="card max-w-2xl">
      <div className="card-header flex items-center gap-3">
        <div className="w-9 h-9 bg-forest-100 rounded-lg flex items-center justify-center">
          <User size={18} className="text-forest-600" />
        </div>
        Profile Information
      </div>
      <div className="card-body">
        {message && (
          <div className={`alert mb-4 text-sm ${status === "success" ? "alert-success" : "alert-error"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group mb-0">
            <label className="form-label">Full Name <span className="text-gold-500">*</span></label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              placeholder="Your full name"
            />
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="form-input opacity-60 cursor-not-allowed"
            />
            <p className="text-forest-400 text-xs mt-1">Email cannot be changed here.</p>
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Phone / WhatsApp</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="+234 800 000 0000"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Save size={16} />
            {status === "loading" ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
