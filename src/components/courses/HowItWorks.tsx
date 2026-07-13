// HowItWorks.tsx
// 4-step process: Register → Assigned → Access Portal → Learn
// Alternating connected steps with numbered circles

const steps = [
  {
    number: "01",
    title:  "Register Online",
    desc:   "Fill in the registration form on our portal. It takes less than 2 minutes. You'll receive a confirmation once submitted.",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    number: "02",
    title:  "Admin Approval",
    desc:   "Our team reviews your registration and activates your account, usually within 24 hours. You'll receive an email notification.",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    number: "03",
    title:  "Make Payment",
    desc:   "Pay your course fee securely online via Paystack using your card or bank transfer. A receipt is sent automatically.",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    number: "04",
    title:  "Access & Learn",
    desc:   "Log into your student dashboard to access classroom links, resources, assignments, and your results — all in one place.",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-divider gold-divider--center mb-5" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-900">
            How It Works
          </h2>
          <p className="mt-4 text-forest-500 max-w-lg mx-auto">
            Getting started is simple. You'll be learning in just a few steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-parchment to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, title, desc, icon }, idx) => (
              <div key={number} className="relative flex flex-col items-center text-center group">
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-forest-900 border-4 border-cream flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-forest-900 transition-all duration-300 shadow-md">
                    {icon}
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center text-forest-900 text-xs font-bold shadow">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-forest-900 mb-3">
                  {title}
                </h3>
                <p className="text-forest-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
