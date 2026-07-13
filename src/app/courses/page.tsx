import Navbar        from "@/components/layouts/Navbar";
import Footer        from "@/components/layouts/Footer";
import CoursesHero   from "@/components/courses/CoursesHero";
import CoursesStats  from "@/components/courses/CoursesStats";
import CoursesGrid   from "@/components/courses/CoursesGrid";
import HowItWorks    from "@/components/courses/HowItWorks";
import CoursesFAQ    from "@/components/courses/CoursesFAQ";
import CoursesCTA    from "@/components/courses/CoursesCTA";

// export const metadata = {
//   title: "Courses | Al-Madrasah Portal",
//   description: "Browse our Islamic courses — Quran, Arabic, Fiqh and more. Structured learning for every level.",
// };

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[var(--nav-height)]">
        <CoursesHero />
        <CoursesStats />
        <CoursesGrid />
        <HowItWorks />
        <CoursesFAQ />
        <CoursesCTA />
      </main>
      <Footer />
    </>
  );
}
