// WhyChooseUs.tsx
// Feature list with large numbers + horizontal rule layout
// Dark green background, gold accents

const reasons = [
  {
    number: "01",
    title:  "Qualified Scholarship",
    desc:   "Every teacher holds formal Islamic credentials — no self-taught instructors or unverified content.",
  },
  {
    number: "02",
    title:  "Structured Curriculum",
    desc:   "Courses follow a clear progression from beginner to advanced, designed in consultation with senior scholars.",
  },
  {
    number: "03",
    title:  "Student Portal & Resources",
    desc:   "Students access all their notes, links, assignments, and results in one secure, easy-to-use dashboard.",
  },
  {
    number: "04",
    title:  "Small Class Sizes",
    desc:   "We keep class sizes intentionally small so every student receives personal attention and guidance.",
  },
  {
    number: "05",
    title:  "Flexible Learning",
    desc:   "Live classes are complemented by recorded sessions and downloadable resources, fitting around your schedule.",
  },
  {
    number: "06",
    title:  "Family-Friendly Environment",
    desc:   "We welcome students of all ages and backgrounds, providing a safe and respectful Islamic learning space.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-forest-900 section-padding overflow-hidden relative">
      <div className="absolute inset-0 pattern-overlay--dark pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="gold-divider mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Why Students Choose
            <br />
            <span className="text-gold-300">
              {" "}
              Dar Al-Arqam Global Institute
            </span>
          </h2>
          <p className="mt-4 text-white/55 leading-relaxed">
            We're not just another online school. Here's what sets us apart.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {reasons.map(({ number, title, desc }) => (
            <div
              key={number}
              className="bg-forest-900 p-8 hover:bg-forest-800 transition-colors duration-300 group"
            >
              <span className="font-display text-5xl font-bold text-gold-500/30 group-hover:text-gold-500/50 transition-colors block mb-4 leading-none">
                {number}
              </span>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
