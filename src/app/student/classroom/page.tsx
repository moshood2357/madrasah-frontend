import StudentLinks from "@/components/student-panel/links/StudentLinks";

export const metadata = { title: "Classroom | Al-Madrasah" };

export default function ClassroomPage() {
  return (
    <StudentLinks
      type="classroom"
      title="Classroom Links"
      desc="Join your live online classes through Google Meet or Classroom."
    />
  );
}
