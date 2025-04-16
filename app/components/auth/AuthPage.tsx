"use client";

import Link from "next/link";
import { useState } from "react";

export default function AuthPage({ type }: { type: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (type === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/auth/${type === "login" ? "signin" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert(`${type === "login" ? "Signed in" : "Account created"} successfully!`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {type === "login" ? "Sign In" : "Create an Account"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg mb-4 hover:bg-gray-700">
          <span>🔗</span> Continue with Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg mb-4 hover:bg-gray-700">
          <span>🎮</span> Continue with Discord
        </button>

        <div className="relative my-4 text-gray-500 text-sm text-center">
          <span className="bg-white px-2">OR</span>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
          {type === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Processing..." : type === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {type === "login" ? (
            <>Don't have an account? <Link href="/auth/signup" className="text-blue-500">Sign up</Link></>
          ) : (
            <>Already have an account? <Link href="/auth/signin" className="text-blue-500">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
