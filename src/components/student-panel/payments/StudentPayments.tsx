"use client";
import { useEffect, useState, useCallback } from "react";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

interface Payment {
  id: number;
  amount: number;
  reference: string;
  status: string;
  method: string;
  description: string | null;
  paid_at: string | null;
  created_at: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
}

const statusIcon = (s: string) => {
  if (s === "success")
    return <CheckCircle size={16} className="text-forest-500" />;
  if (s === "pending") return <Clock size={16} className="text-yellow-500" />;
  return <XCircle size={16} className="text-red-400" />;
};

const statusColor = (s: string) => {
  if (s === "success") return "badge-success";
  if (s === "pending") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-600";
};

// Paystack popup script loader
function loadPaystack(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById("paystack-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export default function StudentPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("Course fee");
  const [payError, setPayError] = useState("");

  const token = () => localStorage.getItem("access_token");

  // ── Fetch payments + user ──────────────────────────────────────────────────
  const fetchPayments = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/me`, {
      headers: { Authorization: `Bearer ${token()}` },
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setPayments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load payment history.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    fetchPayments();
  }, [fetchPayments]);

  // ── Paystack payment ───────────────────────────────────────────────────────
  const handlePaystack = async () => {
    setPayError("");
    const n = parseFloat(amount);
    if (!amount || isNaN(n) || n < 100) {
      setPayError("Enter a valid amount (minimum ₦100).");
      return;
    }
    if (!user?.email) {
      setPayError("User email not found. Please log out and log in again.");
      return;
    }

    setPaying(true);
    await loadPaystack();

    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    // @ts-ignore — Paystack is loaded dynamically
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: user.email,
      amount: n * 100, // Paystack uses kobo
      currency: "NGN",
      ref: `madrasah-${Date.now()}`,
      metadata: { description: desc },

      callback: async (response: { reference: string }) => {
        // Verify with Flask
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token()}`,
              },
              credentials: "include",
              body: JSON.stringify({
                reference: response.reference,
                description: desc,
              }),
            },
          );
          const data = await res.json();
          if (res.ok) {
            setPayments((prev) => [data.payment, ...prev]);
            setAmount("");
            setDesc("Course fee");
          } else {
            setPayError(data.error || "Payment verification failed.");
          }
        } catch {
          setPayError("Could not verify payment. Contact admin.");
        }
        setPaying(false);
      },

      onClose: () => {
        setPaying(false);
        setPayError("Payment was cancelled.");
      },
    });

    handler.openIframe();
  };

  // ── Totals ─────────────────────────────────────────────────────────────────
  const totalPaid = payments
    .filter((p) => p.status === "success")
    .reduce((s, p) => s + p.amount, 0);

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <div className="page-header">
          <h1 className="page-header__title">Payments</h1>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-parchment rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="page-header mb-0">
        <h1 className="page-header__title">Payments</h1>
        <p className="page-header__subtitle">
          Pay your course fees and view your payment history.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-forest-900 rounded-2xl p-6 text-white">
          <p className="text-white/50 text-xs mb-1">Total Paid</p>
          <p className="font-display text-3xl font-bold text-gold-300">
            ₦{totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-parchment p-6">
          <p className="text-forest-400 text-xs mb-1">Total Transactions</p>
          <p className="font-display text-3xl font-bold text-forest-900">
            {payments.length}
          </p>
        </div>
      </div>

      {/* Pay now card */}
      <div className="bg-white rounded-2xl border border-parchment p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-forest-900 mb-1">
          Make a Payment
        </h2>
        <p className="text-forest-500 text-sm mb-5">
          Pay securely online via Paystack — card, bank transfer, or USSD.
        </p>

        {payError && (
          <div className="alert alert-error mb-4 text-sm">{payError}</div>
        )}

        <div className="space-y-4">
          {/* Amount presets */}
          <div>
            <label className="form-label">Amount (₦)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["50000", "100000", "150000", "200000"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    amount === preset
                      ? "bg-forest-900 text-white border-forest-900"
                      : "bg-white text-forest-600 border-parchment hover:border-forest-300"
                  }`}
                >
                  ₦{parseInt(preset).toLocaleString()}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter custom amount…"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              min="100"
            />
          </div>

          {/* Description */}
          <div className="form-group mb-0">
            <label className="form-label">Description</label>
            <input
              type="text"
              placeholder="e.g. First term fee"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Pay button */}
          <button
            onClick={handlePaystack}
            disabled={paying}
            className="pay-btn w-full justify-center"
          >
            {paying ? (
              <span className="flex items-center gap-2">
                <span className="spinner w-5 h-5 border-forest-200 border-t-forest-900" />
                Processing…
              </span>
            ) : (
              <>
                <CreditCard size={18} />
                Pay {amount
                  ? `₦${parseFloat(amount).toLocaleString()}`
                  : "Now"}{" "}
                via Paystack
              </>
            )}
          </button>

          <p className="text-center text-forest-400 text-xs">
            🔒 Secured by Paystack. We never store your card details.
          </p>
        </div>
      </div>

      {/* Payment history */}
      <div>
        <h2 className="font-display text-lg font-semibold text-forest-900 mb-4">
          Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="empty-state bg-white rounded-2xl border border-parchment py-14">
            <CreditCard size={36} className="text-forest-200 mb-3" />
            <p className="empty-state__text text-forest-400">
              No payments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-parchment p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center">
                    {statusIcon(p.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-forest-900 text-sm">
                      ₦{p.amount.toLocaleString()}
                    </p>
                    <p className="text-forest-400 text-xs mt-0.5">
                      {p.description || "Payment"}
                    </p>
                    <p className="text-forest-300 text-xs font-mono">
                      {p.reference?.slice(0, 20)}…
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`badge text-xs ${statusColor(p.status)}`}>
                    {p.status}
                  </span>
                  <p className="text-forest-400 text-xs mt-1">
                    {p.paid_at
                      ? new Date(p.paid_at).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date(p.created_at).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
