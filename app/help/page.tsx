'use client';
import Link from 'next/link';

export default function Help() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">❓ How Can We Help?</h1>
        <p className="text-gray-600 text-center mb-6">
          Find answers to common questions or contact support.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="font-semibold">🔹 How to create an account?</h2>
            <p className="text-gray-600">Visit the Sign Up page and fill in your details.</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="font-semibold">🔹 How to trade crypto?</h2>
            <p className="text-gray-600">Go to the Trading page and explore markets.</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="font-semibold">🔹 Need support?</h2>
            <p className="text-gray-600">
              Contact us at <a href="mailto:support@allchain.com" className="text-blue-500 hover:underline">support@allchain.com</a>.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/">
            <a className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              🔙 Back to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
