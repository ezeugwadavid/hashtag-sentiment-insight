import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHashtagTrend = (hashtag?: string) => {
  return useQuery({
    queryKey: ['trend', hashtag],
    queryFn: async () => {
      const { data } = await axios.get(`/api/trends/${hashtag}`);
      return data;
    },
    enabled: !!hashtag, 
    retry: 1,
  });
};