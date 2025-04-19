"use client"; // Required for hooks in Next.js App Router
import { useEffect, useState } from "react";
import axios from "axios";

// Define a specific type for a single coin's data
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}

const useCoinGecko = () => {
  // State is now typed as an array of Coin objects or null
  const [prices, setPrices] = useState<Coin[] | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 }
        });
        setPrices(data); // Now TypeScript knows that 'data' is an array of Coin objects
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
      }
    };

    fetchPrices();
  }, []);

  return prices;
};

export default useCoinGecko;
