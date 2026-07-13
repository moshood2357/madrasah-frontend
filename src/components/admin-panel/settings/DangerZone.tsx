"use client";
import { useState } from "react";
import { AlertTriangle, LogOut, Trash2 } from "lucide-react";

export default function DangerZone() {
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogoutAll = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("madrasah_settings");
    window.location.href = "/login";
  };

  return (
    <div className="card max-w-2xl border-red-200">
      <div className="card-header flex items-center gap-3 border-red-100">
        <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <span className="text-red-700">Danger Zone</span>
      </div>
      <div className="card-body space-y-4">
        {/* Sign out all devices */}
        <div className="flex items-start justify-between gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
          <div>
            <p className="font-medium text-forest-900 text-sm">Sign Out</p>
            <p className="text-forest-500 text-xs mt-0.5">
              Clear your session and return to the login page.
            </p>
          </div>
          {confirmLogout ? (
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setConfirmLogout(false)}
                className="btn btn-outline btn-sm text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutAll}
                className="btn btn-sm bg-red-600 hover:bg-red-500 text-white border-0 text-xs"
              >
                Confirm
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmLogout(true)}
              className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 flex items-center gap-1.5 flex-shrink-0"
            >
              <LogOut size={14} /> Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
