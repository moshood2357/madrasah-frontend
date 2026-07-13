// About snippet section — brief intro to the Madrasah
// Links to full /about page
export default function AboutSnippet() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="gold-divider mx-auto mb-6" />
        <h2 className="font-display text-4xl font-bold text-forest-900 mb-6">
          Rooted in Tradition. Built for Today.
        </h2>
        <p className="text-forest-700 text-lg leading-relaxed max-w-2xl mx-auto">
          Dar Al-Arqam Global Institute offers authentic Islamic education
          delivered through a modern digital platform. Our curriculum covers
          Quranic studies, Fiqh, Arabic language, and more — taught by qualified
          scholars.
        </p>
        <a
          href="/about"
          className="inline-block mt-8 text-gold-600 font-semibold hover:text-gold-500 border-b border-gold-400 pb-0.5 transition-colors"
        >
          Learn More About Us →
        </a>
      </div>
    </section>
  );
}
