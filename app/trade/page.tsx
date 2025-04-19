'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CandlestickChart from '@/components/CandlestickChart';
import CoinList from '@/components/CoinList';
import OrderPanel from '@/components/OrderPanel';
import useSWR from 'swr';

// Fetching coin data (SWR example)
const fetchCoinData = async (coinId: string) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  const data = await res.json();
  return data;
};

export default function TradePage() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const { data, error } = useSWR(selectedCoin, fetchCoinData);

  const handleBuyClick = () => {
    // Handle the logic for buying
    console.log(`Buying ${selectedCoin}`);
  };

  const handleSellClick = () => {
    // Handle the logic for selling
    console.log(`Selling ${selectedCoin}`);
  };

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-neutral-800 sticky top-0 bg-black z-10">
        <div>
          <h1 className="text-xl font-bold">{selectedCoin.toUpperCase()}/USDT</h1>
          <p className="text-sm text-gray-400">Last Price: {data.market_data.current_price.usd} USDT</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div>24h Change: <span className="text-green-400">+0.30%</span></div>
          <div>High: {data.market_data.high_24h.usd}</div>
          <div>Low: {data.market_data.low_24h.usd}</div>
          <div>Volume: {data.market_data.total_volume.usd}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-neutral-900 p-2 overflow-y-auto">
          <CoinList selectedCoin={selectedCoin} onSelectCoin={setSelectedCoin} />
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          <Card className="p-4">
            <CandlestickChart coinId={selectedCoin} name={selectedCoin.toUpperCase()} symbol={''} image={''} />
          </Card>

          <div className="flex gap-4">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleBuyClick}
              aria-label={`Buy ${selectedCoin.toUpperCase()}`}
            >
              BUY {selectedCoin.toUpperCase()}
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleSellClick}
              aria-label={`Sell ${selectedCoin.toUpperCase()}`}
            >
              SELL {selectedCoin.toUpperCase()}
            </Button>
          </div>
        </main>

        {/* Right Sidebar */}
        <OrderPanel />
      </div>

      {/* Bottom Section */}
      <div className="bg-neutral-900 p-4 mt-4">
        <Tabs defaultValue="wallet">
          <TabsList className="space-x-2">
            <TabsTrigger value="wallet">Coins Wallet</TabsTrigger>
            <TabsTrigger value="orders">Open Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <div className="mt-2 text-sm text-white">Total Asset Value: ₹18,998.53</div>
            <ul className="text-xs text-gray-300 mt-2 space-y-1">
              <li>AGG: ₹1,471.61</li>
              <li>BTTC: ₹189.25</li>
              <li>Bonk: ₹63.20</li>
            </ul>
          </TabsContent>

          <TabsContent value="orders">
            <p className="text-sm text-gray-400 mt-2">No open orders.</p>
          </TabsContent>

          <TabsContent value="history">
            <p className="text-sm text-gray-400 mt-2">No recent history.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
