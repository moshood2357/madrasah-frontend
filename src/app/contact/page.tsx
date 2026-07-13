import Navbar            from "@/components/layouts/Navbar";
import Footer            from "@/components/layouts/Footer";
import ContactHero       from "@/components/contact/ContactHero";
import ContactInfo       from "@/components/contact/ContactInfo";
import ContactFAQStrip   from "@/components/contact/ContactFAQStrip";
import ContactForm       from "@/components/contact/ContactForm";
import ContactMap        from "@/components/contact/ContactMap";

// export const metadata = {
//   title: "Contact Us | Al-Madrasah Portal",
//   description: "Get in touch with Al-Madrasah. Questions about enrolment, courses, payments or your student account.",
// };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[var(--nav-height)]">
        <ContactHero />
        <ContactInfo />
        <ContactFAQStrip />
        <ContactForm />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
