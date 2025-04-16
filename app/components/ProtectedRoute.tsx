// app/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebaseConfig";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isFirebaseLoggedIn = !!user;

      if (!isFirebaseLoggedIn && !isConnected) {
        router.push("/auth/login"); // redirect to login
      }
    });

    return () => unsubscribe();
  }, [isConnected, router]);

  return <>{children}</>;
}
