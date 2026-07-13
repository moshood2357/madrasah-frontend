// Bottom CTA — "Ready to start learning?" dark green background, Enroll + Login buttons
export default function CallToAction() {
  return (
    <section className="py-24 bg-forest-900 text-white text-center px-4">
      <div className="max-w-2xl mx-auto">
        <p className="bismillah text-xl mb-4">اطلبوا العلم من المهد إلى اللحد</p>
        <h2 className="font-display text-4xl font-bold mb-4">
          Begin Your Journey of Knowledge
        </h2>
        <p className="text-white/60 mb-10">
          Register today and access all your courses, resources, and results in one place.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/register" className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-8 py-3.5 rounded-lg transition-colors">
            Register Now
          </a>
          <a href="/login" className="border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-lg transition-colors">
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}
