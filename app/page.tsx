'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import useSWR from 'swr';
import { motion } from 'framer-motion';


import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { signIn } from "next-auth/react";


interface CryptoData {
  [key: string]: {
    usd: number;
    usd_24h_change?: number;
    market_cap: number;
    total_volume: number;
    circulating_supply: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());



export default function HomePage() {
  const loginRef = useRef<HTMLDivElement>(null);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/home" });
      alert('Logged in with Google!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMetaMaskLogin = async () => {
    try {
      const metamaskConnector = connectors.find(
        (c) => c.name === 'MetaMask'
      );
      if (!metamaskConnector) throw new Error('MetaMask not available');
      await connect({ connector: metamaskConnector });
      alert('Connected with MetaMask!');
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  const { data, error: priceError } = useSWR<CryptoData>(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_circulating_supply=true',
    fetcher,
    { refreshInterval: 10000 }
  );

  const scrollToLogin = () => {
    setTimeout(() => {
      loginRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Top-right Login Box */}
      {showLoginBox && (
        
        <div ref={loginRef}
        className="absolute top-24 right-36 p-6 bg-[#1a1a1a] rounded-xl shadow-xl w-80 z-50 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">Login</h2>

          <Button
            onClick={handleGoogleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-3 w-full hover:bg-blue-700 transition"
          >
            Sign In with Google
          </Button>

          {isConnected ? (
            <div>
              <p className="mb-2 text-sm text-white">Connected Wallet:</p>
              <p className="text-xs font-mono text-blue-400">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</p>
              <Button
                onClick={() => disconnect()}
                className="mt-3 bg-slate-700 text-white px-4 py-2 rounded w-full hover:bg-slate-600 transition"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleMetaMaskLogin}
              className="bg-indigo-500 text-white px-4 py-2 rounded w-full hover:bg-indigo-600 transition"
            >
              Sign In with MetaMask
            </Button>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      )}

      {/* Hero Section */}
      <motion.section
  className="flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-10 max-w-7xl mx-auto"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <div className="md:w-1/2 text-center md:text-left space-y-6">
    <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text leading-tight">
      Trade Crypto with Confidence
    </h1>
    <p className="text-lg text-gray-400">
      Secure. Fast. Low Fees. The Future of Trading Starts Here.
    </p>
    <div>
      <Button
        onClick={() => setShowLoginBox(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Get Started
      </Button>
    </div>
  </div>

  {/* Optional placeholder SVG for professional look */}
  <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
    <svg
      className="w-64 h-64 text-blue-600 opacity-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M..." /> {/* Abstract shapes, subtle curves, or graph-like lines */}
    </svg>
  </div>
</motion.section>


      {/* Live Market Prices */}
      <motion.section
        className="py-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-3xl font-semibold text-blue-400">Live Market Prices</h2>
        <div className="w-full max-w-6xl mx-auto bg-[#1a1a1a] p-6 rounded-xl shadow-lg mt-6 overflow-x-auto">
          {priceError ? (
            <p className="text-red-500">Failed to load prices: {priceError.message}</p>
          ) : !data ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-3">Asset</th>
                  <th className="py-3">Price (USD)</th>
                  <th className="py-3">24h Change</th>
                  <th className="py-3">Market Cap</th>
                  <th className="py-3">24h Volume</th>
                  <th className="py-3">Circulating Supply</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-700 hover:bg-[#222] transition">
                    <td className="py-3 uppercase text-white font-semibold">{key}</td>
                    <td className="py-3 text-blue-400">${value.usd.toFixed(2)}</td>
                    <td
                      className={`py-3 ${
                        value.usd_24h_change && value.usd_24h_change > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      } font-semibold`}
                    >
                      {value.usd_24h_change ? value.usd_24h_change.toFixed(2) : 'N/A'}%
                    </td>
                    <td className="py-3 text-gray-300">${(value.market_cap / 1e9).toFixed(2)}B</td>
                    <td className="py-3 text-gray-300">${(value.total_volume / 1e9).toFixed(2)}B</td>
                    <td className="py-3 text-gray-300">{(value.circulating_supply / 1e6).toFixed(2)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.section>

      {/* Features Section */}
<section className="py-20 px-6 bg-[#0e0e0e]">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-14">
    Why Choose <span className="text-blue-500">AllChain</span>?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        title: 'Low Fees',
        description: 'Trade crypto with minimal costs and maximum value.',
        icon: '💸',
      },
      {
        title: 'Secure Wallet',
        description: 'Top-tier encryption keeps your assets safe and sound.',
        icon: '🔐',
      },
      {
        title: 'NFT Marketplace',
        description: 'Seamlessly buy, sell, and discover digital collectibles.',
        icon: '🖼️',
      },
    ].map((feature, i) => (
      <div
        key={i}
        className="bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 p-8 rounded-2xl shadow-lg border border-gray-800 text-white text-center"
      >
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-400 text-sm">{feature.description}</p>
      </div>
    ))}
  </div>
</section>


      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-5xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
            <p className="text-gray-400">Use MetaMask or any supported wallet.</p>
          </div>
          <div>
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Trade</h3>
            <p className="text-gray-400">Instantly buy and sell crypto.</p>
          </div>
          <div>
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Withdraw</h3>
            <p className="text-gray-400">Move funds securely to your account.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
<section className="py-20 px-6 text-center">
  <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Crypto?</h2>
  <button 
    onClick={() => {
      setShowLoginBox(true);
      setTimeout(() => scrollToLogin(), 100); // slight delay so box appears before scroll
    }} 
    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl transition"
  >
    Get Started
  </button>
</section>

<footer className="py-10 px-6 bg-[#111] text-center text-gray-500 text-sm">
  <p>&copy; 2025 AllChain. All rights reserved.</p>
  <div className="mt-4 flex justify-center gap-6">
    <a href="#" className="hover:text-white transition">Privacy</a>
    <a href="#" className="hover:text-white transition">Terms</a>
    <a href="#" className="hover:text-white transition">Support</a>
  </div>
</footer>
    </div>
  );
}
