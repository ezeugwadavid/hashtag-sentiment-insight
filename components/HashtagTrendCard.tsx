import React, { useCallback } from 'react';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import dynamic from 'next/dynamic';
const DynamicChart = dynamic(() => import('./SentimentChart'), {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  });

interface Props {
  data?: any;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const HashtagTrendCard: React.FC<Props> = React.memo(({ data, isLoading, isError, refetch }) => {
  const getTrendIcon = useCallback(() => {
    if (!data?.trend) return '';
    const first = data.trend[0]?.sentiment ?? 0;
    const last = data.trend.at(-1)?.sentiment ?? 0;
    return last > first ? '📈' : '📉';
  }, [data]);

  if (isLoading) return <CircularProgress sx={{ display: 'block', m: '2rem auto' }} />;

  if (isError) {
    return (
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          Failed to load sentiment data.
        </Typography>
        <Button variant="contained" onClick={refetch}>Retry</Button>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {data.hashtag} {getTrendIcon()}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {data.range}
        </Typography>
        {data?.trend && <DynamicChart data={data.trend} />}
      </CardContent>
    </Card>
  );
});

export default HashtagTrendCard;