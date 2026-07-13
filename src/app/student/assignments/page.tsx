import StudentLinks from "@/components/student-panel/links/StudentLinks";

export const metadata = { title: "Assignments | Al-Madrasah" };

export default function AssignmentsPage() {
  return (
    <StudentLinks
      type="assignment"
      title="Assignments"
      desc="View and complete your assignments. Click Open Assignment to access via Google Forms or Classroom."
    />
  );
}
