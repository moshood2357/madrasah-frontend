// Hero Section
// Full-viewport, dark forest-green background with Islamic geometric pattern overlay
// Bismillah in Arabic at top centre
// Large display headline, subtitle, two CTAs: "Explore Courses" + "Student Portal"
// Animated crescent/stars decorative elements

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-forest-900 pattern-overlay flex items-center justify-center text-white text-center px-4">
      <div className="max-w-3xl mx-auto">
        <p className="bismillah text-2xl mb-6">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
          Seek Knowledge.<br />
          <span className="text-gold-300">Illuminate Your Path.</span>
        </h1>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Join our online Madrasah and access Islamic courses, resources, and a
          dedicated student portal — wherever you are.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/courses" className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-8 py-3.5 rounded-lg transition-colors">
            Explore Courses
          </a>
          <a href="/register" className="border border-white/30 hover:border-gold-300 text-white hover:text-gold-300 font-medium px-8 py-3.5 rounded-lg transition-colors">
            Student Portal
          </a>
        </div>
      </div>
    </section>
  );
}
