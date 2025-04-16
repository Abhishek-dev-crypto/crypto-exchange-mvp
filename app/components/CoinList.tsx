'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap: number;
  price_change_percentage_24h: number;
}

export default function CoinList({
  selectedCoin,
  onSelectCoin,
}: {
  selectedCoin: string;
  onSelectCoin: (coinId: string) => void;
}) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1')
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2 text-white">
      <input
        type="text"
        placeholder="Search coins..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-2 py-1 mb-2 rounded bg-neutral-800 text-sm"
      />

      {filteredCoins.map((coin) => (
        <div
          key={coin.id}
          onClick={() => onSelectCoin(coin.id)}
          className={`flex items-center justify-between gap-2 p-2 rounded cursor-pointer hover:bg-gray-800 ${
            selectedCoin === coin.id ? 'bg-gray-800 border-l-4 border-blue-500' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <Image src={coin.image} alt={coin.name} width={24} height={24} />
            <div className="text-sm">
              <div className="capitalize">{coin.symbol}</div>
              <div className="text-xs text-gray-400">${coin.market_cap.toLocaleString()}</div>
            </div>
          </div>
          <div
            className={`text-xs ${
              coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}
