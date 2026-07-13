import Navbar       from "@/components/layouts/Navbar";
import Footer       from "@/components/layouts/Footer";
import AboutHero    from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import OurStory     from "@/components/about/OurStory";
import CoreValues   from "@/components/about/CoreValues";
// import OurTeachers  from "@/components/about/OurTeachers";
import WhyChooseUs  from "@/components/about/WhyChooseUs";
import AboutCTA     from "@/components/about/AboutCTA";

// export const metadata = {
//   title: "About Us | Al-Madrasah Portal",
//   description: "Learn about Al-Madrasah — our mission, vision, teachers, and values.",
// };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[var(--nav-height)]">
        <AboutHero />
        <MissionVision />
        <OurStory />
        <CoreValues />
        {/* <OurTeachers /> */}
        <WhyChooseUs />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
