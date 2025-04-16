import useSWR from 'swr';

// Define your API endpoint
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

// Fetcher function (to be used by SWR)
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch market data');
  return response.json();
};

// Custom hook for fetching market data
export function useMarketData() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher, {
    refreshInterval: 60000, // Auto-refresh every 60 seconds
  });

  return {
    data,
    isLoading,
    error,
  };
}
