'use client';

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react"; // Client-side session provider

export default function ClientSessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
