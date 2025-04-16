'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OrderBook from '@/components/OrderBook';

const OrderPanel = () => {
  return (
    <aside className="w-[300px] bg-neutral-900 p-4 overflow-y-auto hidden lg:block">
      <Tabs defaultValue="orderbook">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook">
          <div className="flex justify-between text-xs text-gray-400 py-2">
            <span>Bids</span>
            <span>Asks</span>
          </div>
          <OrderBook />
        </TabsContent>

        <TabsContent value="history">
          <div className="text-xs text-gray-400 mt-2">Recent Trades</div>
          <ul className="text-xs mt-1 space-y-1">
            <li className="text-green-400">BUY @ 0.0000000656</li>
            <li className="text-red-400">SELL @ 0.0000000657</li>
          </ul>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default OrderPanel;
