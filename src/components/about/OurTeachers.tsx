// OurTeachers.tsx
// Team/scholars section — 3 or 4 teacher cards
// Update the data array with real teacher names, bios and specialisations

const teachers = [
  {
    name:       "Ustadh Abdullah Yusuf",
    title:      "Head of Quranic Studies",
    speciality: "Tajweed & Hifz",
    bio:        "Holder of an ijazah in the ten Qira'at. Over 15 years of teaching experience in Nigeria and abroad.",
    initial:    "AY",
    color:      "bg-forest-700",
  },
  {
    name:       "Ustadha Maryam Idris",
    title:      "Arabic Language Lead",
    speciality: "Nahwu, Sarf & Classical Arabic",
    bio:        "Graduate of the Islamic University of Madinah. Specialises in making classical Arabic accessible to beginners.",
    initial:    "MI",
    color:      "bg-gold-600",
  },
  {
    name:       "Ustadh Ibrahim Bello",
    title:      "Fiqh & Islamic Studies",
    speciality: "Hanafi Fiqh & Aqeedah",
    bio:        "Studied under senior scholars in Egypt and Nigeria. Brings both rigour and warmth to his teaching.",
    initial:    "IB",
    color:      "bg-forest-800",
  },
  {
    name:       "Ustadha Fatimah Suleiman",
    title:      "Sisters' Circle Teacher",
    speciality: "Seerah & Islamic Ethics",
    bio:        "Dedicated to providing quality Islamic education for sisters and young girls in a nurturing environment.",
    initial:    "FS",
    color:      "bg-gold-700",
  },
];

export default function OurTeachers() {
  return (
    <section className="bg-white section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-divider gold-divider--center mb-5" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900">
            Meet Our Teachers
          </h2>
          <p className="mt-4 text-forest-500 max-w-xl mx-auto">
            Every teacher at Dar Al-Arqam Global Institute holds formal Islamic
            qualifications and is committed to the success of every student.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
          {teachers.map(({ name, title, speciality, bio, initial, color }) => (
            <div
              key={name}
              className="group bg-cream rounded-2xl border border-parchment overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Avatar header */}
              <div
                className={`${color} pattern-overlay--dark h-32 flex items-center justify-center`}
              >
                <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-white">
                    {initial}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-forest-900 leading-tight">
                  {name}
                </h3>
                <p className="text-gold-600 text-xs font-medium mt-1 mb-1">
                  {title}
                </p>
                <span className="inline-block bg-forest-50 text-forest-600 text-xs px-2.5 py-1 rounded-full mb-3">
                  {speciality}
                </span>
                <p className="text-forest-600 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-forest-400 text-sm mt-10">
          All teachers hold formal Islamic qualifications and are personally
          vetted by our academic committee.
        </p>
      </div>
    </section>
  );
}
