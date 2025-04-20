import { NextResponse } from "next/server";

let lastRequestTime = 0; // Store the last time the request was made
const rateLimitInterval = 60000; // 1 minute rate limit window (in milliseconds)
const cache: { [key: string]: any } = {}; // Simple in-memory cache

// Cached data expiration time (in milliseconds)
const cacheExpiration = 60000; // Cache for 1 minute

export async function GET() {
  const currentTime = Date.now();

  // Check if the rate limit has been exceeded
  if (currentTime - lastRequestTime < rateLimitInterval) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  lastRequestTime = currentTime;

  // Check if the data is cached and not expired
  if (cache['prices'] && Date.now() - cache['prices'].timestamp < cacheExpiration) {
    return NextResponse.json(cache['prices'].data, { status: 200 });
  }

  const API_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd";
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
      next: { revalidate: 60 }, // Cache response for 60 seconds
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("Rate limit exceeded on CoinGecko API.");
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `Failed to fetch prices: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cache the data for 60 seconds
    cache['prices'] = { data, timestamp: Date.now() };

    return NextResponse.json(data, { status: 200 });

  } catch (error: unknown) {
    console.error("API Error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.name === "AbortError" ? "Request timed out" : "Error fetching prices" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred." },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout); // Ensure timeout is always cleared
  }
}
