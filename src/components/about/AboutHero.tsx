// AboutHero.tsx
// Dark forest-green hero with Arabic calligraphy quote and page title

export default function AboutHero() {
  return (
    <section className="relative bg-forest-900 pattern-overlay--dark overflow-hidden">
      {/* Decorative arc shape at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-cream"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center text-white">
        {/* Arabic quote */}
        <p className="bismillah text-2xl mb-3">
          اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ
        </p>
        <p className="text-gold-300/70 text-sm mb-10 italic">
          "Seek knowledge from the cradle to the grave."
        </p>

        {/* Divider */}
        <div className="gold-divider gold-divider--center mb-8" />

        {/* Heading */}
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
          About{" "}
          <span className="text-gold-300"> Dar Al-Arqam Global Institute</span>
        </h1>
        <p className="mt-6 text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
          A trusted Islamic learning centre bringing authentic scholarship to
          students wherever they are, through a modern digital platform.
        </p>
      </div>
    </section>
  );
}
