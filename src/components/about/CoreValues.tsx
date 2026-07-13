// CoreValues.tsx
// Six value cards in a 3-column grid with icon + title + description

const values = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Authenticity",
    desc:  "Our curriculum is grounded in the Quran, Sunnah, and the tradition of qualified Islamic scholarship.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Knowledge",
    desc:  "We believe seeking knowledge is a religious duty. Every course is designed to instil depth, not just information.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Community",
    desc:  "We foster a welcoming environment where students, families, and teachers grow together in faith.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Excellence",
    desc:  "We hold our teachers and students to a high standard — reflecting the Islamic value of ihsan in all we do.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Accessibility",
    desc:  "Learning should have no borders. Our online platform ensures quality Islamic education is available to all.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Integrity",
    desc:  "From how we teach to how we handle student data — trust, honesty, and accountability guide everything.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-forest-50 section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <div className="gold-divider gold-divider--center mb-5" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900">
            What We Stand For
          </h2>
          <p className="mt-4 text-forest-500 max-w-xl mx-auto">
            Six principles that shape every decision we make and every
            lesson we teach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto stagger">
          {values.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="animate-fade-up bg-white rounded-2xl p-8 border border-parchment shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-xl bg-forest-50 text-forest-600 group-hover:bg-gold-100 group-hover:text-gold-700 flex items-center justify-center mb-5 transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-forest-900 mb-3">
                {title}
              </h3>
              <p className="text-forest-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
