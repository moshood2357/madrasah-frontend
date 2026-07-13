// AboutCTA.tsx
// Bottom CTA section — warm cream background, two action buttons
// Sits just above the Footer

import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="bg-cream section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-parchment shadow-lg overflow-hidden">
          {/* Top gold strip */}
          <div className="h-2 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

          <div className="p-12 text-center">
            <p className="bismillah text-xl mb-4">
              وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ
            </p>
            <p className="text-gold-600 text-xs mb-8 italic">
              "And He has taught you what you did not know." — Quran 4:113
            </p>

            <h2 className="font-display text-4xl font-bold text-forest-900 mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-forest-600 leading-relaxed mb-10 max-w-lg mx-auto">
              Join hundreds of students already learning at Dar Al-Arqam Global
              Institute . Register today or explore our courses to find the
              right path for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn btn-secondary btn-lg">
                Register Now
              </Link>
              <Link href="/courses" className="btn btn-outline btn-lg">
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
