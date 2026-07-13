import StudentLinks from "@/components/student-panel/links/StudentLinks";

export const metadata = { title: "Tests & Exams | Al-Madrasah" };

export default function TestsPage() {
  return (
    <StudentLinks
      type="test"
      title="Tests & Exams"
      desc="Access your online tests and examinations. Make sure you are ready before clicking Start."
    />
  );
}
