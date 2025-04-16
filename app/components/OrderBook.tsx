'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

const OrderBook = () => {
  return (
    <Card className="bg-neutral-900 p-4 mt-4">
      <h3 className="text-white text-lg font-semibold mb-2">Order Book</h3>
      <div className="text-gray-400 text-sm">
        {/* Replace with real order book data */}
        <p>Buy Orders</p>
        <p>Sell Orders</p>
      </div>
    </Card>
  );
};

export default OrderBook;
