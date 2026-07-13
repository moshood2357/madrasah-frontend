// CoursesFAQ.tsx
// Accordion FAQ — click to expand each question
// Common questions about enrolment, scheduling, payment, etc.

"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need any prior Islamic knowledge to enrol?",
    a: "Not at all. Many of our courses are designed for complete beginners. Each course page lists the prerequisite level — if it says 'Beginner', you can join with zero prior knowledge.",
  },
  {
    q: "How are classes conducted?",
    a: "Classes are conducted via Google Classroom and Google Meet. Once registered and approved, you'll receive links to your classes directly through your student dashboard.",
  },
  {
    q: "What is the class schedule?",
    a: "Schedules vary per course — typically 1–2 sessions per week. The exact timetable for each course is shared with students after enrolment. We aim to offer timings suitable for Nigerian and international students.",
  },
  {
    q: "How do I pay for a course?",
    a: "After your account is approved by admin, you can pay securely through your student dashboard using Paystack — which supports cards, bank transfers, and USSD. Your access is confirmed once payment is verified.",
  },
  {
    q: "Can I enrol my child?",
    a: "Yes. Al-Madrasah welcomes students of all ages. For younger students, we recommend parental involvement in the registration process and monitoring of progress.",
  },
  {
    q: "What happens if I miss a class?",
    a: "Recorded sessions and notes are made available through your student portal where possible. Speak to your teacher if you're struggling to keep up — we'll work with you.",
  },
  {
    q: "Is there a certificate at the end?",
    a: "We are currently working on a certification programme. In the meantime, students receive formal results and progress reports through the portal, and teachers issue letters of completion on request.",
  },
  {
    q: "Can I contact my teacher directly?",
    a: "Students can reach teachers through the student portal contact feature or via the class group on Google Classroom. Direct personal contact details are not shared.",
  },
];

export default function CoursesFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-forest-50 section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="gold-divider gold-divider--center mb-5" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-forest-500">
              Everything you need to know before enrolling.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map(({ q, a }, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  open === idx ? "border-gold-300 shadow-sm" : "border-parchment"
                }`}
              >
                {/* Question row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  <span
                    className={`font-medium text-base transition-colors ${
                      open === idx ? "text-forest-900" : "text-forest-700"
                    }`}
                  >
                    {q}
                  </span>
                  {/* Plus / minus icon */}
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      open === idx
                        ? "bg-gold-500 text-forest-900 rotate-45"
                        : "bg-forest-50 text-forest-500"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                {open === idx && (
                  <div className="px-6 pb-5 animate-fade-down">
                    <p className="text-forest-600 text-sm leading-relaxed border-t border-parchment pt-4">
                      {a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-forest-400 text-sm mt-10">
            Still have questions?{" "}
            <a href="/contact" className="text-gold-600 hover:text-gold-500 underline underline-offset-2">
              Contact us
            </a>{" "}
            and we'll get back to you.
          </p>
        </div>
      </div>
    </section>
  );
}
