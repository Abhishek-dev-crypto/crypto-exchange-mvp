"use client";

import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet } from "viem/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { MyContextProvider } from "@/contexts/MyContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Session } from "next-auth";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

// ✅ GlobalNav stays the same
function GlobalNav() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-2xl font-bold hover:text-blue-400 cursor-pointer">AllChain</span>
        </Link>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link href="/dashboard"><span className="hover:text-blue-400 cursor-pointer">Dashboard</span></Link>
          <Link href="/trade"><span className="hover:text-blue-400 cursor-pointer">Trade</span></Link>
          <Link href="/security"><span className="hover:text-blue-400 cursor-pointer">Security</span></Link>
          <Link href="/legal"><span className="hover:text-blue-400 cursor-pointer">Legal</span></Link>
          <Link href="/support"><span className="hover:text-blue-400 cursor-pointer">Support</span></Link>
        </div>
      </div>
    </nav>
  );
}

// ✅ Inner component to handle session-aware logic
function ClientLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isLoggedIn = !!session;

  // Hide nav on landing page and all auth routes
  const shouldHideNav = pathname === "/" || pathname.startsWith("/auth");
  const shouldShowNav = isLoggedIn && !shouldHideNav;

  return (
    <>
      {shouldShowNav && <GlobalNav />}
      <main>{children}</main>
    </>
  );
}

// ✅ Outer layout wraps providers
interface ClientLayoutProps {
  children: ReactNode;
  session?: Session;
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider>
          <SessionProvider session={session}>
            <MyContextProvider>
              <NotificationProvider>
                <ClientLayoutInner>{children}</ClientLayoutInner>
              </NotificationProvider>
            </MyContextProvider>
          </SessionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
