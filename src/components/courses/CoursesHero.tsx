// CoursesHero.tsx
// Page hero — dark green with Arabic quote, title and short intro

export default function CoursesHero() {
  return (
    <section className="relative bg-forest-900 pattern-overlay--dark overflow-hidden">
      {/* Bottom arc cutout */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-cream"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center text-white">
        <p className="bismillah text-2xl mb-3">
          وَقُل رَّبِّ زِدْنِي عِلْمًا
        </p>
        <p className="text-gold-300/70 text-sm mb-10 italic">
          "And say: My Lord, increase me in knowledge." — Quran 20:114
        </p>

        <div className="gold-divider gold-divider--center mb-8" />

        <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
          Our <span className="text-gold-300">Courses</span>
        </h1>
        <p className="mt-6 text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
          Structured Islamic learning paths for every level — from complete
          beginners to advanced students of knowledge.
        </p>
      </div>
    </section>
  );
}
