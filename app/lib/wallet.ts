import { useState } from 'react';

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];

        // Ensure there is at least one account available
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          console.error("No accounts found.");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  return {
    account,
    isConnected,
    connectWallet,
    disconnectWallet
  };
};
