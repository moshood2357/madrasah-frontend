// Global Footer
// Logo + tagline | Quick links | Contact info | Social icons
// Bottom bar: copyright

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl text-gold-300 mb-3">
            {" "}
            Dar Al-Arqam Global Institute
          </p>
          <p className="bismillah text-sm">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-3 text-sm text-white">
            Nurturing Islamic knowledge and character.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Courses", "/courses"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-gold-300 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm text-white">info@madrasah.com</p>
          <p className="text-sm mt-1 text-white">+2348083870587</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-forest-700 text-center text-xs">
        © {new Date().getFullYear()} Dar Al-Arqam Global Institute. All rights
        reserved. &nbsp;
        <span>
          Developed by{" "}
          <a
            rel="noopener noreferrer"
            className="underline text-blue-500"
            href="https://vertexprimedigital.com"
            target="_blank"
          >
           Vertex Prime Digital
          </a>
        </span>
      </div>
    </footer>
  );
}
