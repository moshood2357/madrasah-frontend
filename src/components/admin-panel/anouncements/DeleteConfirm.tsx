// DeleteConfirm.tsx
// Reusable delete confirmation modal

"use client";
import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  title:     string;
  message:   string;
  onConfirm: () => Promise<void>;
  onClose:   () => void;
}

export default function DeleteConfirm({ title, message, onConfirm, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box max-w-sm animate-scale-in">
        <div className="modal-body text-center py-8">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <h3 className="font-display text-xl font-bold text-forest-900 mb-2">{title}</h3>
          <p className="text-forest-500 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="modal-footer justify-center">
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn btn-sm bg-red-600 hover:bg-red-500 text-white border-0"
          >
            {loading ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
