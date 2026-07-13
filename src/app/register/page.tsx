// Registration Page
// Fields: Full Name, Email, Phone, Password, Confirm Password
// On success → pending admin approval or auto-login
// Admin receives notification of new registration

import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

// export const metadata = { title: "Create Account | Madrasah Portal" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream pattern-overlay">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-20">
        <RegisterForm />

        {/* Auth switch */}
        {/* <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-gold-700 hover:underline font-medium">
            Sign in
          </Link>
        </p> */}
      </main>

      <Footer />
    </div>
  );
}
