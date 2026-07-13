// ContactMap.tsx
// Office hours + location section
// Embeds a Google Maps iframe (replace src with actual embed URL from Google Maps)
// For now shows a styled placeholder with office hours

const officeHours = [
  { day: "Monday – Thursday", hours: "9:00am – 6:00pm" },
  { day: "Friday",            hours: "9:00am – 12:00pm" },
  { day: "Saturday",          hours: "10:00am – 4:00pm" },
  { day: "Sunday",            hours: "Closed" },
];

export default function ContactMap() {
  return (
    <section className="bg-forest-50 section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch">

          {/* Office hours card */}
          <div className="bg-forest-900 rounded-2xl p-10 pattern-overlay--dark overflow-hidden relative flex flex-col justify-between">
            <div>
              <div className="gold-divider mb-6" />
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Office Hours
              </h2>
              <p className="text-white/50 text-sm mb-8">
                When you can reach us by phone, WhatsApp, or email.
              </p>

              <div className="space-y-4">
                {officeHours.map(({ day, hours }) => (
                  <div
                    key={day}
                    className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white/70 text-sm">{day}</span>
                    <span
                      className={`text-sm font-medium ${
                        hours === "Closed"
                          ? "text-white/30"
                          : "text-gold-300"
                      }`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/60 text-xs leading-relaxed">
                <span className="text-gold-300 font-medium">Note:</span> Classes and
                academic support continue through our online portal outside
                office hours. Students can always submit queries through their
                dashboard.
              </p>
            </div>
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden border border-parchment shadow-sm min-h-[400px] bg-parchment relative">
            {/*
              TO ACTIVATE:
              1. Go to Google Maps → search your location
              2. Click Share → Embed a map → copy the iframe src
              3. Replace the placeholder below with the real src URL
            */}
            <iframe
              title="Al-Madrasah Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46305297385!2d3.1191197!3d6.5480356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
