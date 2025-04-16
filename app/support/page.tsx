'use client';

import { useState } from "react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For MVP, simulate sending the support request.
    setSubmitted(true);
    // In production, you would send the message to your support API endpoint.
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Support & FAQ</h1>
          <p className="text-xl">
            Find answers to your questions or contact our support team.
          </p>
        </header>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">How do I create an account?</h3>
              <p className="mt-2">
                To create an account, click on the "Sign Up" button on the login page and follow the on‑screen instructions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">How can I deposit funds?</h3>
              <p className="mt-2">
                Once your account is set up, navigate to your Dashboard and follow the deposit instructions. We support several payment methods.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">What are the fees for trading?</h3>
              <p className="mt-2">
                Our fee structure is transparent and competitive. Please check the Fees section on our website for detailed information.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">How do I secure my account?</h3>
              <p className="mt-2">
                We highly recommend enabling Two-Factor Authentication (2FA) for an extra layer of security. You can manage your security settings in your profile.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Contact Support</h2>
          {submitted ? (
            <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded">
              Thank you for contacting support! We will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Submit
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-gray-600">
            Alternatively, you can email us at{" "}
            <a href="mailto:support@allchain.com" className="text-blue-600 underline">
              support@allchain.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
