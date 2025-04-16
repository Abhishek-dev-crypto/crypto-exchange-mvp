// app/components/LogoutButton.tsx
"use client";

import { signOut } from "firebase/auth";
import { auth } from "lib/firebaseConfig";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      disconnect(); // MetaMask logout
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
