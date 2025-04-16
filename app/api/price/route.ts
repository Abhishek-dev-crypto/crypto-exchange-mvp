import { NextResponse } from "next/server";

export async function GET() {
  const API_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
  
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
    return NextResponse.json(data, { status: 200 });

  } catch (error: unknown) { // Change to `unknown`
    console.error("API Error:", error);

    if (error instanceof Error) { // Check if error is an instance of Error
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
