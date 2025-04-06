import { NextApiRequest, NextApiResponse } from 'next';
import { trendData } from '../../../mocks/trendData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { hashtag } = req.query;
  const data = trendData[String(hashtag).toLowerCase()];

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ error: 'Hashtag data not found' });
  }
}