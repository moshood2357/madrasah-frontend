// ContactHero.tsx
// Dark green hero with Arabic greeting and page title

export default function ContactHero() {
  return (
    <section className="relative bg-forest-900 pattern-overlay--dark overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-cream"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center text-white">
        <p className="bismillah text-2xl mb-3">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
        <p className="text-gold-300/70 text-sm mb-10 italic">
          "Peace be upon you and the mercy of Allah."
        </p>
        <div className="gold-divider gold-divider--center mb-8" />
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
          Get in <span className="text-gold-300">Touch</span>
        </h1>
        <p className="mt-6 text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
          Have a question about enrolment, courses, or your student account?
          We're here to help — reach out and we'll respond promptly.
        </p>
      </div>
    </section>
  );
}
