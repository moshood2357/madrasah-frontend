// Login Page
// - Email + password form
// - JWT token stored in HTTP-only cookie via /api/auth/login
// - Role-based redirect: student → /student/dashboard, admin → /admin/dashboard
// - "Don't have an account? Register" link

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LoginForm from "@/components/forms/LoginForm";

// export const metadata = { title: "Sign In | Madrasah Portal" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream pattern-overlay">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 pt-32">
        <LoginForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
