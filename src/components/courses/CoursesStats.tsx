// CoursesStats.tsx
// A warm parchment band between the hero and grid showing key numbers

const stats = [
  { value: "8",     label: "Courses Available",   icon: "📚" },
  { value: "500+",  label: "Students Enrolled",   icon: "👨‍🎓" },
  { value: "12",    label: "Qualified Teachers",  icon: "🎓" },
  { value: "100%",  label: "Online & Flexible",   icon: "💻" },
];

export default function CoursesStats() {
  return (
    <section className="bg-parchment border-y border-sand py-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className="text-2xl mb-1">{icon}</span>
              <p className="font-display text-3xl font-bold text-forest-900">{value}</p>
              <p className="text-forest-500 text-xs leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
