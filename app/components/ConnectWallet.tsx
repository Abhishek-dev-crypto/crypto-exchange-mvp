'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import ConnectModal from "./ConnectModal";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const ConnectWallet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedAccount = localStorage.getItem('account');
    if (savedAccount && window.ethereum) {
      setAccount(savedAccount);
      const provider = new BrowserProvider(window.ethereum);
      fetchBalance(provider, savedAccount);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install it to continue.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request?.({ method: 'eth_requestAccounts' });

      if (Array.isArray(accounts) && accounts.length > 0) {
        const userAccount = accounts[0];
        setAccount(userAccount);
        localStorage.setItem('account', userAccount);
        fetchBalance(provider, userAccount);
      } else {
        setError('No accounts returned.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Wallet connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async (provider: BrowserProvider, address: string) => {
    try {
      const rawBalance = await provider.getBalance(address);
      setBalance(formatEther(rawBalance));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {account ? (
        <div>
            <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Connect Modal
      </button>
      <ConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <p className="text-green-500">Connected: {account}</p>
          {balance !== null && <p className="text-blue-500">Balance: {balance} ETH</p>}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ConnectWallet;
