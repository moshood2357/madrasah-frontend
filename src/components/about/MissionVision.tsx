// MissionVision.tsx
// Two-column cards: Mission (forest-green) + Vision (gold/parchment)

export default function MissionVision() {
  return (
    <section className="bg-cream section-padding">
      <div className="container">
        {/* Section label */}
        <div className="text-center mb-16">
          <div className="gold-divider gold-divider--center mb-5" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900">
            Our Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <div className="relative bg-forest-900 rounded-2xl p-10 overflow-hidden">
            {/* Faint pattern */}
            <div className="absolute inset-0 pattern-overlay--dark opacity-60 pointer-events-none" />
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center mb-6">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#e4b332"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-gold-300 mb-4">
                Our Mission
              </h3>
              <p className="text-white/70 leading-relaxed">
                To provide pristine, accessible, and transformative Islamic
                education through innovative technology, qualified instructors,
                and a structured curriculum rooted in the Qur'an and Sunnah.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative bg-white border border-parchment rounded-2xl p-10 overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-40 pointer-events-none" />
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-6">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#a87813"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest-900 mb-4">
                Our Vision
              </h3>
              <p className="text-forest-600 leading-relaxed">
                To become a leading global online Islamic learning institution
                that nurtures knowledgeable, practicing Muslims who promote and
                call to Islam with insight (sure knowledge) and who will make
                positive impact on their families, communities, and society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
