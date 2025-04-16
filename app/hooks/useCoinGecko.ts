"use client"; // Required for hooks in Next.js App Router
import { useEffect, useState } from "react";
import axios from "axios";

const useCoinGecko = () => {
  const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 }
        });
        setPrices(data);
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
      }
    };

    fetchPrices();
  }, []);

  return prices;
};

export default useCoinGecko;
