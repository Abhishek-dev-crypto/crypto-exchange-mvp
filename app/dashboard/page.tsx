'use client';

import { useState, useEffect, FormEvent } from "react";
import { useAccount } from "wagmi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebaseConfig";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "../components/LogoutButton"; // Optional

// Dummy data for MVP
const dummyAccountData = {
  balance: 12345.67,
  portfolio: [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 30000, value: 15000 },
    { symbol: 'ETH', name: 'Ethereum', amount: 10, price: 2000, value: 20000 },
  ],
  transactions: [
    { id: 1, type: 'Buy', symbol: 'BTC', amount: 0.1, price: 29000, date: '2024-09-01' },
    { id: 2, type: 'Sell', symbol: 'ETH', amount: 1, price: 2100, date: '2024-09-05' },
  ]
};

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [updateMessage, setUpdateMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({
          name: user.displayName || "",
          email: user.email || ""
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>

          {/* Account Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
            <div className="bg-white shadow rounded p-6">
              <p className="text-xl">
                <strong>Balance:</strong> ${dummyAccountData.balance.toFixed(2)}
              </p>
            </div>
          </section>

          {/* Portfolio Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Summary</h2>
            <div className="bg-white shadow rounded p-6 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">Coin</th>
                    <th className="text-left py-2 px-4 border-b">Amount</th>
                    <th className="text-left py-2 px-4 border-b">Current Price</th>
                    <th className="text-left py-2 px-4 border-b">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyAccountData.portfolio.map((item) => (
                    <tr key={item.symbol} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">
                        {item.name} ({item.symbol})
                      </td>
                      <td className="py-2 px-4 border-b">{item.amount}</td>
                      <td className="py-2 px-4 border-b">${item.price.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">${item.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Transaction History */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            <div className="bg-white shadow rounded p-6 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">ID</th>
                    <th className="text-left py-2 px-4 border-b">Type</th>
                    <th className="text-left py-2 px-4 border-b">Coin</th>
                    <th className="text-left py-2 px-4 border-b">Amount</th>
                    <th className="text-left py-2 px-4 border-b">Price</th>
                    <th className="text-left py-2 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyAccountData.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{tx.id}</td>
                      <td className="py-2 px-4 border-b">{tx.type}</td>
                      <td className="py-2 px-4 border-b">{tx.symbol}</td>
                      <td className="py-2 px-4 border-b">{tx.amount}</td>
                      <td className="py-2 px-4 border-b">${tx.price.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Profile Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
            <div className="bg-white shadow rounded p-6">
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setUpdateMessage("Profile updated successfully!");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-1 text-gray-700">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                >
                  Update Profile
                </button>
              </form>
              {updateMessage && <p className="mt-4 text-green-600">{updateMessage}</p>}
            </div>
          </section>

          {/* Logout button - optional */}
          <LogoutButton />
        </div>
      </div>
    </ProtectedRoute>
  );
}
