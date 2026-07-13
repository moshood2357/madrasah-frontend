// ContactForm.tsx
// Main contact form — name, email, subject (dropdown), message
// Submits to POST /api/contact (public endpoint, no auth required)
// Shows success/error states inline

"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const subjects = [
  "General Enquiry",
  "Course Information",
  "Enrolment & Registration",
  "Student Account Help",
  "Payment Issue",
  "Technical Support",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    full_name: "",
    email:     "",
    phone:     "",
    subject:   "",
    message:   "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError]   = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to send message.");

      setStatus("success");
      setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section className="bg-white section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto items-start">

          {/* Left — intro text */}
          <div className="lg:col-span-2">
            <div className="gold-divider mb-6" />
            <h2 className="font-display text-4xl font-bold text-forest-900 leading-tight mb-5">
              Send Us a<br />
              <span className="text-forest-600 italic">Message</span>
            </h2>
            <p className="text-forest-600 leading-relaxed mb-8">
              Whether you're a prospective student, a parent, or a current
              student with a question — we'd love to hear from you.
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                { icon: "⏱", text: "We aim to respond within 24 hours on working days." },
                { icon: "🔒", text: "Your information is kept private and never shared." },
                { icon: "🤝", text: "For urgent matters, WhatsApp is the fastest way to reach us." },
              ].map(({ icon, text }) => (
                <div key={text} className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">{icon}</span>
                  <p className="text-forest-500 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Social / WhatsApp */}
            <div className="mt-10 p-5 bg-forest-50 rounded-xl border border-forest-100">
              <p className="text-forest-700 font-medium text-sm mb-3">
                Prefer WhatsApp?
              </p>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {/* WhatsApp icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-cream rounded-2xl border border-parchment p-8 md:p-10">

              {/* Success state */}
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="32" height="32" fill="none" stroke="#1a5c22" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-forest-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-forest-600 mb-6">
                    Jazakallahu Khayran for reaching out. We'll get back to you
                    within 24 hours inshaAllah.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group mb-0">
                      <label className="form-label" htmlFor="full_name">
                        Full Name <span className="text-gold-500">*</span>
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.full_name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label" htmlFor="email">
                        Email Address <span className="text-gold-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Row: Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-group mb-0">
                      <label className="form-label" htmlFor="phone">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label" htmlFor="subject">
                        Subject <span className="text-gold-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="" disabled>
                          Select a subject…
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-group mb-0">
                    <label className="form-label" htmlFor="message">
                      Message <span className="text-gold-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Write your message here…"
                      value={form.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="alert alert-error text-sm">{error}</div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-secondary w-full"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner w-5 h-5" />
                        Sending…
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-center text-forest-400 text-xs">
                    By submitting this form you agree to our privacy policy.
                    We never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
