'use client';
import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

interface Props {
  data: { date: string; sentiment: number }[];
}

const SentimentChart: React.FC<Props> = React.memo(({ data }) => {
  const chartData = useMemo(() => {
    return {
      xAxis: [{ data: data.map(item => item.date), scaleType: 'point' as const }],
      series: [{ data: data.map(item => item.sentiment), label: 'Sentiment' }],
    };
  }, [data]);

  return (
    <LineChart
      height={300}
      xAxis={chartData.xAxis}
      series={chartData.series}
      sx={{ width: '100%' }}
    />
  );
});

export default SentimentChart;