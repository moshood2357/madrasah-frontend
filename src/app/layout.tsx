import type { Metadata } from "next";
import "./globals.css";

// ─── Site-wide constants ───────────────────────────────────────────────────
const SITE_NAME = "Dar Al-Arqam Global Institute";
const SITE_URL = "https://www.daralarqam.com";
const SITE_TAGLINE = "Authentic Islamic Education — Anywhere in the World";
const SITE_DESC =
  "Dar Al-Arqam Global Institute is a comprehensive Islamic learning institution offering " +
  "Quran recitation, Hifz, Tajweed, Fiqh, Aqeedah, Arabic, Hadith, Seerah, " +
  "and Islamic Studies for children, teenagers, and adults worldwide. " +
  "Live online classes, qualified instructors, rooted in the Quran and Sunnah.";

const TWITTER_HANDLE = "@daralarqam"; // update when available

const OG_IMAGE = {
  url: `${SITE_URL}/logo4.png`, // create a 1200x630 branded image
  width: 1200,
  height: 630,
  alt: "Dar Al-Arqam Global Institute — Authentic Islamic Education Online",
};

// ─── Shared keywords ──────────────────────────────────────────────────────
const BASE_KEYWORDS = [
  "Dar Al-Arqam Global Institute",
  "Islamic education online",
  "learn Quran online",
  "Islamic school online",
  "online Islamic classes",
  "Quran recitation online",
  "Tajweed classes online",
  "Hifz programme online",
  "Arabic language Islamic",
  "Fiqh classes online",
  "Aqeedah course",
  "Hadith studies online",
  "Seerah course",
  "Islamic studies for children",
  "Muslim online school",
  "Islamic education Nigeria",
  "online madrasa",
  "Islamic learning platform",
  "Quran for kids online",
  "adult Islamic education",
];

// ─── Root / default metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESC,
  keywords: BASE_KEYWORDS,

  authors: [{ name: "Dar Al-Arqam Global Institute", url: SITE_URL }],
  creator: "Dar Al-Arqam Global Institute",
  publisher: "Dar Al-Arqam Global Institute",

  // Canonical & alternates
  alternates: {
    canonical: SITE_URL,
    languages: { "en-NG": `${SITE_URL}/en-NG` },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESC,
    images: [OG_IMAGE.url],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },

  // App / PWA
  applicationName: SITE_NAME,
  category: "education",

  // Verification — add when available
  // verification: {
  //   google: "google-site-verification-token-here",
  // },
};

// ─── Per-page metadata helpers ────────────────────────────────────────────

export const homeMetadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    "Join Dar Al-Arqam Global Institute — a leading Islamic learning institution offering " +
    "Quran, Arabic, Fiqh, and Islamic Studies for all ages. Live classes, " +
    "qualified scholars, accessible worldwide. Register today.",
  keywords: [
    ...BASE_KEYWORDS,
    "register for Islamic classes",
    "start learning Quran",
    "Islamic school for families",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Authentic Islamic education for children, teenagers, and adults. Join our global online Madrasah today.",
    url: SITE_URL,
    images: [OG_IMAGE],
  },
};

export const aboutMetadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Dar Al-Arqam Global Institute — our mission to provide pristine, accessible " +
    "Islamic education rooted in the Quran and Sunnah. Meet our qualified " +
    "scholars and discover our vision for global Islamic learning.",
  keywords: [
    ...BASE_KEYWORDS,
    "about dar al-arqam",
    "Islamic scholars online",
    "qualified Islamic teachers",
    "madrasah mission vision",
    "Islamic learning institution",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Us | Dar Al-Arqam Global Institute",
    description:
      "Our mission: pristine, accessible, and transformative Islamic education through qualified instructors and a curriculum rooted in the Quran and Sunnah.",
    url: `${SITE_URL}/about`,
    images: [OG_IMAGE],
  },
};

export const coursesMetadata: Metadata = {
  title: "Islamic Courses & Programs",
  description:
    "Browse our full range of Islamic courses — Quran Recitation, Hifz, " +
    "Tajweed, Arabic Language, Fiqh, Aqeedah, Hadith, Seerah, and Islamic " +
    "Studies. Programs for children, teenagers, and adults. Enrol today.",
  keywords: [
    ...BASE_KEYWORDS,
    "Quran memorisation programme",
    "Tajweed course online",
    "Islamic studies curriculum",
    "Arabic for beginners",
    "Fiqh for Muslims",
    "Hadith course online",
    "Seerah of the Prophet",
    "Islamic classes for kids",
    "Islamic classes for adults",
    "evening madrasah online",
    "weekend Islamic school",
  ],
  alternates: { canonical: `${SITE_URL}/courses` },
  openGraph: {
    title: "Islamic Courses & Programs | Dar Al-Arqam Global Institute",
    description:
      "Quran, Arabic, Fiqh, Aqeedah, Hadith, Seerah and more — structured Islamic courses for all ages and levels.",
    url: `${SITE_URL}/courses`,
    images: [OG_IMAGE],
  },
};

export const contactMetadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dar Al-Arqam Global Institute. Questions about enrolment, courses, " +
    "or your student account? We respond within 24 hours. Contact us by email, " +
    "phone, or WhatsApp.",
  keywords: [
    ...BASE_KEYWORDS,
    "contact dar al-arqam",
    "enrol in Islamic school",
    "Islamic school enquiry",
    "register for Quran classes",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us | Dar Al-Arqam Global Institute",
    description:
      "Reach out to Dar Al-Arqam Global Institute for course enquiries, enrolment, and support. We're here to help.",
    url: `${SITE_URL}/contact`,
    images: [OG_IMAGE],
  },
};

export const loginMetadata: Metadata = {
  title: "Student Sign In",
  description:
    "Sign in to your Dar Al-Arqam Global Institute student portal to access your courses, resources, classroom links, and results.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/login` },
};

export const registerMetadata: Metadata = {
  title: "Create Student Account",
  description:
    "Register for Dar Al-Arqam Global Institute — create your student account to access Islamic courses, resources, and your personalised learning portal.",
  alternates: { canonical: `${SITE_URL}/register` },
  openGraph: {
    title: "Register | Dar Al-Arqam Global Institute",
    description:
      "Create your free student account and start your Islamic learning journey today.",
    url: `${SITE_URL}/register`,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
