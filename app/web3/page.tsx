import Image from 'next/image';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Web3Page = async () => {
  const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

  let coins: Coin[] = [];

  const web3Coins = [
    "ethereum",
    "polkadot",
    "chainlink",
    "the-graph",
    "filecoin",
    "arweave",
    "theta-token",
    "ocean-protocol",
    "helium",
    "storj",
    "akash-network",
    "render-token",
    "livepeer",
  ];

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      coins = data.filter((coin: Coin) => web3Coins.includes(coin.id));
    } else {
      console.error("Unexpected API response format:", data);
    }
  } catch (error) {
    console.error("Error fetching Web3 coins:", error);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Web3 Coins</h1>
      {coins.length === 0 ? (
        <p className="text-red-500">Failed to load Web3 coins.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <div key={coin.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-gray-500">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p className="mt-2">💰 Price: ${coin.current_price.toLocaleString()}</p>
              <p
                className={`mt-1 ${
                  coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}% (24h)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Web3Page;
