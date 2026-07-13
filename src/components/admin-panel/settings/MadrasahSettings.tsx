"use client";
import { useState } from "react";
import { Settings, Save } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function MadrasahSettings() {
  const [madrasahName,  setMadrasahName]  = useState("Al-Madrasah");
  const [email,         setEmail]         = useState("");
  const [phone,         setPhone]         = useState("");
  const [whatsapp,      setWhatsapp]      = useState("");
  const [address,       setAddress]       = useState("");
  const [feeAmount,     setFeeAmount]     = useState("");
  const [feeDesc,       setFeeDesc]       = useState("Course fee");
  const [status,        setStatus]        = useState<Status>("idle");
  const [message,       setMessage]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // For now save to localStorage — wire to backend /api/admin/settings when ready
    const settings = { madrasahName, email, phone, whatsapp, address, feeAmount, feeDesc };
    localStorage.setItem("madrasah_settings", JSON.stringify(settings));

    setTimeout(() => {
      setMessage("Settings saved successfully.");
      setStatus("success");
    }, 500);
  };

  return (
    <div className="card max-w-2xl">
      <div className="card-header flex items-center gap-3">
        <div className="w-9 h-9 bg-gold-100 rounded-lg flex items-center justify-center">
          <Settings size={18} className="text-gold-700" />
        </div>
        Madrasah Settings
      </div>
      <div className="card-body">
        {message && (
          <div className={`alert mb-4 text-sm ${status === "success" ? "alert-success" : "alert-error"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Madrasah name */}
          <div className="form-group mb-0">
            <label className="form-label">Madrasah Name</label>
            <input
              type="text"
              value={madrasahName}
              onChange={(e) => setMadrasahName(e.target.value)}
              className="form-input"
              placeholder="e.g. Al-Madrasah Online"
            />
          </div>

          {/* Contact info */}
          <div className="pt-2 pb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-400 mb-3">
              Contact Information
            </p>
            <div className="space-y-4">
              <div className="form-group mb-0">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="info@almadrasah.com"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="form-label">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="form-input"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Address / Location</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                  placeholder="Lagos, Nigeria"
                />
              </div>
            </div>
          </div>

          {/* Fee settings */}
          <div className="pt-2 pb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-400 mb-3">
              Default Payment Settings
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Default Fee Amount (₦)</label>
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  className="form-input"
                  placeholder="e.g. 15000"
                  min="0"
                />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Fee Description</label>
                <input
                  type="text"
                  value={feeDesc}
                  onChange={(e) => setFeeDesc(e.target.value)}
                  className="form-input"
                  placeholder="e.g. First term fee"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Save size={16} />
            {status === "loading" ? "Saving…" : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
