// app/components/TradingViewEmbed.tsx
'use client';

const TradingViewEmbed = () => {
  return (
    <iframe
      src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=30&theme=dark&style=1"
      width="100%"
      height="500"
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default TradingViewEmbed;
