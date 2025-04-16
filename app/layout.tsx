// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Warning from "@/components/Warning";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Providers } from "./providers";
import ClientWrapper from "./components/ClientWrapper";
import Navigation from "./components/Navigation";
import GlobalNav from "./components/GlobalNav";

export const metadata: Metadata = {
  title: "Crypto MVP",
  description: "A secure and fast crypto trading platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NotificationProvider>
            <div className="absolute top-0 left-0 w-full z-50"></div>
            <Warning />
            <ClientWrapper>
              <GlobalNav />
              <main className="flex flex-col min-h-screen">{children}</main>
              <Navigation />
            </ClientWrapper>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
