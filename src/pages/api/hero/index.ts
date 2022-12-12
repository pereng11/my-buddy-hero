import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
  body: {
    success: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method !== 'POST') return;

  await dbConnect();
  const hero = new Hero({ ...req.body, completeNumber: 0 });
  hero
    .save()
    .then(() => {
      return res.status(201).json({
        statusCode: 201,
        body: {
          success: true,
        },
      });
    })
    .catch(() => {
      return res.status(500).json({
        statusCode: 500,
        body: {
          success: false,
        },
      });
    });
}
