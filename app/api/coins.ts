import { NextResponse } from 'next/server';

// API route to fetch coin data from CoinGecko
export async function GET(request: Request) {
  const url = new URL(request.url);
  const coinId = url.searchParams.get('coinId');  // Get the 'coinId' parameter from the URL query

  // If no coinId is provided, return an error response
  if (!coinId) {
    return NextResponse.json({ error: 'coinId is required' }, { status: 400 });
  }

  try {
    // Fetch coin data from CoinGecko API
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    // Parse the JSON response
    const data = await response.json();
    
    // Return the coin data in the response
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // Return an error response if fetching the data fails
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
