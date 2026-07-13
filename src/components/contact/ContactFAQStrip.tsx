// ContactFAQStrip.tsx
// A slim strip of quick-answer links pointing users to common topics
// Reduces form submissions for simple questions

import Link from "next/link";

const quickLinks = [
  {
    question: "How do I register as a student?",
    href:     "/register",
    label:    "Go to Registration →",
  },
  {
    question: "What courses do you offer?",
    href:     "/courses",
    label:    "View All Courses →",
  },
  {
    question: "How does payment work?",
    href:     "/courses#how-it-works",
    label:    "See How It Works →",
  },
  {
    question: "I already have an account",
    href:     "/login",
    label:    "Sign In →",
  },
];

export default function ContactFAQStrip() {
  return (
    <section className="bg-parchment border-y border-sand py-12">
      <div className="container">
        <p className="text-center text-forest-500 text-sm font-medium mb-8 uppercase tracking-widest">
          Quick answers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {quickLinks.map(({ question, href, label }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl border border-parchment p-5 hover:border-gold-300 hover:shadow-sm transition-all duration-200 group"
            >
              <p className="text-forest-700 text-sm font-medium mb-2 leading-snug">
                {question}
              </p>
              <span className="text-gold-600 text-xs font-semibold group-hover:text-gold-500 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
