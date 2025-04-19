'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';
import type { ApexOptions } from 'apexcharts';
import toast, { Toaster } from 'react-hot-toast';


const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickChartProps {
  name: string; // ⬅️ Make sure this line is here
  symbol: string;
  image?: string;
  coinId: string;
}

const dateRanges = {
  '1D': 1,
  '7D': 7,
  '1M': 30,
  '3M': 90,
  '1Y': 365,
} as const;

const CandlestickChart: React.FC<CandlestickChartProps> = ({ coinId }) => {
  const [range, setRange] = useState<keyof typeof dateRanges>('1D');
  const [series, setSeries] = useState<{ data: { x: Date; y: number[] }[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [coinMeta, setCoinMeta] = useState<{
    name: string;
    symbol: string;
    image: string;
  } | null>(null);

  // Fetch coin metadata
  useEffect(() => {
    const fetchCoinMeta = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        setCoinMeta({
          name: data.name,
          symbol: data.symbol,
          image: data.image.thumb,
        });
      } catch (error) {
        console.error('Error fetching coin metadata:', error);
        setCoinMeta(null);
      }
    };

    fetchCoinMeta();
  }, [coinId]);

  // Fetch OHLC chart data
  useEffect(() => {
    const fetchOHLCData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc`,
          {
            params: {
              vs_currency: 'usd',
              days: dateRanges[range],
            },
          }
        );

        const formatted = data.map((item: number[]) => ({
          x: new Date(item[0]),
          y: [item[1], item[2], item[3], item[4]],
        }));

        setSeries([{ data: formatted }]);
      } catch (error) {
        console.error('Error fetching OHLC data:', error);
        setSeries([]);
        toast.error('Failed to load chart data, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOHLCData();
  }, [coinId, range]);


  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: { mode: 'dark' },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#ccc' } },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (val: number) => `$${val.toFixed(2)}`,
        style: { colors: '#ccc' },
      },
    },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#333' },
  };

  return (
    <div>
      {/* Toast Container */}
      <Toaster position="bottom-center" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <div className="flex items-center gap-2">
          
          <h2 className="text-xl font-semibold text-white tracking-wide">
            {coinMeta ? `${coinMeta.name} (${coinMeta.symbol?.toUpperCase()}) / USD` : 'Loading...'}
          </h2>
        </div>

        <div className="flex flex-wrap gap-1">
          {Object.keys(dateRanges).map((label) => (
            <Button
              key={label}
              size="sm"
              variant={range === label ? 'default' : 'ghost'}
              onClick={() => setRange(label as keyof typeof dateRanges)}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <Card className="bg-neutral-900 p-3">
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spinner />
          </div>
        ) : series.length === 0 ? (
          <div className="text-center text-white">No data available</div>
        ) : (
          <ApexChart options={options} series={series} type="candlestick" height={300} />
        )}
      </Card>

      

      
    </div>
  );
};

export default CandlestickChart;
