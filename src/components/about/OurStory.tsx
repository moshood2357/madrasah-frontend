// OurStory.tsx
// Alternating layout: large text block left + decorative element right
// Warm cream background with a gold accent column

export default function OurStory() {
  return (
    <section className="bg-cream section-padding overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left — Story text */}
          <div>
            <div className="gold-divider mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900 leading-tight mb-6">
              How Dar Al-Arqam Global Institute
              <br />
              <span className="text-forest-600 italic">Came to Be</span>
            </h2>
            <div className="space-y-5 text-forest-700 leading-relaxed">
              <p>
                Dar Al-Arqam Global Institute was founded with a simple but
                urgent conviction: that quality Islamic education should not be
                limited by geography, economics, or circumstance. Too many
                Muslims — especially in underserved communities — were growing
                up with little access to qualified Islamic instruction.
              </p>
              <p>
                What began as a small circle of dedicated teachers and eager
                students has grown into a structured online learning centre,
                offering courses in Quranic recitation, Arabic language, Fiqh,
                and Islamic studies — delivered through a modern, accessible
                digital platform.
              </p>
              <p>
                Today, students from across Nigeria and beyond are part of our
                community. We remain committed to the same founding values:
                authentic scholarship, caring instruction, and a genuine love
                for the deen.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "500+", label: "Students Enrolled" },
                { value: "12", label: "Qualified Teachers" },
                { value: "6", label: "Courses Offered" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-bold text-forest-900">
                    {value}
                  </p>
                  <p className="text-xs text-forest-500 mt-1 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Decorative panel */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative bg-forest-900 rounded-3xl p-10 pattern-overlay--dark overflow-hidden">
              <p className="bismillah text-3xl text-center mb-6">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <div className="gold-divider gold-divider--center mb-6" />
              <blockquote className="text-white/80 text-center italic font-display text-xl leading-relaxed">
                "Whoever treads a path in search of knowledge, Allah will make
                easy for him a path to Paradise."
              </blockquote>
              <p className="text-gold-400 text-center text-sm mt-4">
                — Prophet Muhammad ﷺ (Sahih Muslim)
              </p>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-gold-500 rounded-2xl px-6 py-4 shadow-lg">
              <p className="font-display text-3xl font-bold text-forest-900">
                Est.
              </p>
              <p className="font-display text-4xl font-bold text-forest-900 leading-none">
                2020
              </p>
            </div>

            {/* Decorative circle */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-4 border-gold-300/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
