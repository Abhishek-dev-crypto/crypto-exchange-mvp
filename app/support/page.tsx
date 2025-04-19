'use client';

import { useState } from "react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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

        {/* Contact Support Form */}
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
        </section>
      </div>
    </div>
  );
}
