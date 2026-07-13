// CoursesCTA.tsx
// Bottom enrolment CTA — dark green, gold accents, two buttons

import Link from "next/link";

export default function CoursesCTA() {
  return (
    <section className="bg-forest-900 pattern-overlay--dark section-padding relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-gold-400/10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full border border-gold-400/10 pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="bismillah text-2xl mb-3">تَعَلَّمُوا الْعِلْمَ</p>
          <p className="text-gold-300/60 text-sm italic mb-10">
            "Acquire knowledge."
          </p>

          <div className="gold-divider gold-divider--center mb-8" />

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Start Learning Today
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-12">
            Registration is quick and free. Once your account is approved, you'll
            have access to your personalised student portal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn btn-primary btn-lg"
            >
              Create a free account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-gold-400 text-white hover:text-gold-300 font-medium px-8 py-3.5 rounded-lg transition-all duration-200"
            >
              Sign In to Portal
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/40 text-xs">
            {[
              "✓ No commitment required",
              "✓ Secure Paystack payments",
              "✓ Access from any device",
              "✓ Cancel anytime",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
