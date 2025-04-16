"use client";  // Important for Next.js 13+ with App Router

import { createContext, useContext, useState } from "react";

// Create a context
const MyContext = createContext<{ basename: string } | null>(null);

// Create a provider component
export function MyProvider({ children }: { children: React.ReactNode }) {
  const [basename, setBasename] = useState("default-value");

  return (
    <MyContext.Provider value={{ basename }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook to use the context
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
