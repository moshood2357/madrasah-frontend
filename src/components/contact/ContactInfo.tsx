// ContactInfo.tsx
// Three info cards: Email, Phone, Location
// Update the actual details to match the client's real contact info

const info = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: "info@almadrasah.com",
    sub:   "We reply within 24 hours",
    href:  "mailto:info@almadrasah.com",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Call or WhatsApp",
    value: "+234 800 000 0000",
    sub:   "Mon – Sat, 9am – 6pm",
    href:  "tel:+2348000000000",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Our Location",
    value: "Lagos, Nigeria",
    sub:   "Online-first — students worldwide",
    href:  null,
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-cream py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {info.map(({ icon, label, value, sub, href }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-parchment p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-xl bg-forest-50 text-forest-700 group-hover:bg-gold-100 group-hover:text-gold-700 flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                {icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-forest-400 mb-2">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="font-display text-xl font-semibold text-forest-900 hover:text-gold-600 transition-colors block mb-1"
                >
                  {value}
                </a>
              ) : (
                <p className="font-display text-xl font-semibold text-forest-900 mb-1">
                  {value}
                </p>
              )}
              <p className="text-forest-400 text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
