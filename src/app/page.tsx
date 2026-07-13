// Public Home Page
// Sections: Hero, About snippet, Courses overview, Testimonials, CTA
// Uses Navbar and Footer from @/components/layouts

import Navbar  from "@/components/layouts/Navbar";
import Footer  from "@/components/layouts/Footer";
import Hero    from "@/components/home/Hero";
import AboutSnippet from "@/components/home/AboutSnippet";
import CoursesSnippet from "@/components/home/CoursesSnippet";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSnippet />
        <CoursesSnippet />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
