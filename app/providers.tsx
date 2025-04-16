// app/providers.tsx
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getDefaultConfig,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react'; // ✅ Add this
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'All Chain',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // ✅ Replace with env var
  chains: [mainnet, polygon, arbitrum],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider> {/* ✅ Wrap entire app with SessionProvider */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
