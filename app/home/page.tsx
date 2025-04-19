'use client';
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (!mounted || status === "loading") return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Welcome, {session?.user?.name}</h2>
      <p className="mb-4">You are successfully logged in!</p>
      <button
        onClick={() => router.push("/trade")}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Trading Page
      </button>
    </div>
  );
}
