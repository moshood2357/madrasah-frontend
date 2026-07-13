"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "error";

export default function LoginForm() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        setErrorMessage(data.error || "Login failed. Please try again.");
        setStatus("error");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      const role = data.user?.role;
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/student/dashboard";
      }

    } catch (err) {
      setErrorMessage("Cannot connect to server. Please try again.");
      setStatus("error");
      console.log("Login error:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
      <p className="text-center text-gray-500 mt-2">Sign in to your account</p>

      {errorMessage && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-gold-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div> */}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green-700 text-white p-3 rounded-lg disabled:opacity-60"
        >
          {status === "loading" ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-gold-700 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
