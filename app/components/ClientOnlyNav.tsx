"use client";

import { usePathname } from "next/navigation";
import Navbar from "./GlobalNav"; // Ensure correct import path

export default function ClientOnlyNav() {
  const pathname = usePathname();

  // Only exclude the navbar on sign-in and sign-up pages
  if (pathname === "/auth/signin" || pathname === "/auth/signup") return null;

  return <Navbar />;
}
