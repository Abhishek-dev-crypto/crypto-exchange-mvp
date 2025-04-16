import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!; // Replace with your actual ID

// Step 1: Define supported chains
export const chains = [mainnet, polygon, arbitrum, optimism] as const;

// Step 2: Get connectors
const { connectors } = getDefaultWallets({
  appName: 'All Chain',
  projectId,
});

// Step 3: Export wagmi config with required fields
export const config = createConfig({
  connectors,
  chains, // ✅ ADD THIS LINE
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});
