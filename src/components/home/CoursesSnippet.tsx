// Courses preview section — 3 featured course cards
// Data could be hardcoded initially or fetched from GET /api/courses?featured=true
export default function CoursesSnippet() {
  const courses = [
    { title: "Quranic Studies", desc: "Tajweed, memorisation, and Tafseer for all levels.", icon: "📖" },
    { title: "Arabic Language",  desc: "Classical Arabic grammar, reading, and comprehension.", icon: "🔤" },
    { title: "Islamic Fiqh",     desc: "Practical rulings and foundations of Islamic jurisprudence.", icon: "⚖️" },
  ];
  return (
    <section className="py-24 bg-forest-50 pattern-overlay">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl font-bold text-forest-900">Our Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-8 shadow-sm border border-parchment hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{c.icon}</div>
              <h3 className="font-display text-2xl font-semibold text-forest-800 mb-3">{c.title}</h3>
              <p className="text-forest-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/courses" className="inline-block bg-forest-700 hover:bg-forest-600 text-white font-medium px-8 py-3 rounded-lg transition-colors">
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}
