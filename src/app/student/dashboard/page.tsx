"use client";
import WelcomeBanner       from "@/components/student-panel/dashboard/WelcomeBanner";
import QuickAccessGrid     from "@/components/student-panel/dashboard/QuickAccessGrid";
import RecentAnnouncements from "@/components/student-panel/dashboard/RecentAnnouncements";
import ClassroomLinks      from "@/components/student-panel/dashboard/ClassroomLinks";
import UpcomingDeadlines   from "@/components/student-panel/dashboard/UpcomingDeadlines";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Quick access tiles */}
      <QuickAccessGrid />

      {/* Middle row — announcements + classroom links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAnnouncements />
        <ClassroomLinks />
      </div>

      {/* Assignments & tests */}
      <UpcomingDeadlines />

    </div>
  );
}
