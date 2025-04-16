"use client";

import { useEffect, useState } from "react";

interface NFT {
  id: string;
  name: string;
  image_url: string;
  permalink: string;
}

export default function NFTList() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(
          `https://api.opensea.io/api/v2/assets?limit=5`, // ✅ Use v2 API
          {
            headers: apiKey ? { "X-API-KEY": apiKey } : {}, // ✅ Only include if available
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenSea API Error: ${errorData.detail || "Unknown error"}`);
        }

        const data = await response.json();
        console.log("Fetched NFTs:", data); // ✅ Debugging logs
        setNfts(data.assets || []);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Latest NFTs on OpenSea</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <a key={nft.id} href={nft.permalink} target="_blank" rel="noopener noreferrer">
              <div className="border p-2 rounded-lg shadow-lg hover:shadow-xl transition">
                <img src={nft.image_url} alt={nft.name} className="w-full h-40 object-cover rounded-lg" />
                <p className="mt-2 text-center text-sm font-medium">{nft.name}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500">No NFTs found.</p>
        )}
      </div>
    </div>
  );
}
