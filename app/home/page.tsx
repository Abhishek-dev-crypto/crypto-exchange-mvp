'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Trade from "../../app/trade/page"; // import the trade page directly

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Trade />
    </div>
  );
}
