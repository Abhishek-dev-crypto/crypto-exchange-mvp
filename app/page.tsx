'use client';

import { useRef, useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from 'lib/firebaseConfig';
import { useRouter } from 'next/navigation';

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

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
  <div className="bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 p-8 rounded-2xl shadow-lg border border-gray-800 text-white text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default function HomePage() {
  const loginRef = useRef<HTMLDivElement>(null);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/trade'); // Redirect to /trade
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      } else {
        setError('Something went wrong');
      }
    }
  };

  const { data, error: priceError } = useSWR<CryptoData>(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_circulating_supply=true',
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Top-right Login Box */}
      {showLoginBox && (
        <div
          ref={loginRef}
          className="absolute top-24 right-36 p-6 bg-[#1a1a1a] rounded-xl shadow-xl w-80 z-50 border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4 text-white text-center">Login</h2>
          <Button
            onClick={handleGoogleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-3 w-full hover:bg-blue-700 transition"
          >
            Sign In with Google
          </Button>
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

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <svg
            className="w-64 h-64 text-blue-600 opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 21h20L12 2z" />
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
                      className={`py-3 ${value.usd_24h_change && value.usd_24h_change > 0
                        ? 'text-green-400'
                        : 'text-red-400'} font-semibold`}
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
          {[{ title: 'Low Fees', description: 'Trade crypto with minimal costs and maximum value.', icon: '💸' },
          { title: 'Secure Wallet', description: 'Top-tier encryption keeps your assets safe and sound.', icon: '🔐' },
          { title: 'NFT Marketplace', description: 'Seamlessly buy, sell, and discover digital collectibles.', icon: '🖼️' }].map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
