'use client';

import { useState } from 'react';

const TokenSwapSimulator = () => {
  const [fromToken, setFromToken] = useState<string>('ETH');
  const [toToken, setToToken] = useState<string>('DAI');
  const [amount, setAmount] = useState<string>('');
  const [swapDetails, setSwapDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSwapQuote = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=${toToken}&sellToken=${fromToken}&sellAmount=${amount}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch swap quote.');
      }
      const data = await response.json();
      setSwapDetails(data);
    } catch (error) {
      console.error('Error fetching swap quote:', error);
      setError('Failed to fetch swap quote.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl mb-4">Token Swap Simulator</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="From Token (e.g., ETH)"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value.toUpperCase())}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="To Token (e.g., DAI)"
          value={toToken}
          onChange={(e) => setToToken(e.target.value.toUpperCase())}
          className="border p-2"
        />
      </div>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={fetchSwapQuote}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Get Swap Quote
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {swapDetails && (
        <div className="mt-4 p-4 border rounded">
          <p>Price: {swapDetails.price}</p>
          <p>Guaranteed Price: {swapDetails.guaranteedPrice}</p>
          <p>To Token Amount: {swapDetails.buyAmount}</p>
          <p>From Token Amount: {swapDetails.sellAmount}</p>
        </div>
      )}
    </div>
  );
};

export default TokenSwapSimulator;
