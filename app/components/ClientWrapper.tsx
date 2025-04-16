"use client"; // Ensure it's a client-side component

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet } from "viem/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Initialize the Query Client and Wagmi configuration
const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
