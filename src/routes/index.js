import express from 'express';
import { studiesRouter } from './studies.route.js';
import { prisma } from '#db/prisma.js';

export const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await prisma.$queryRaw`SELECT NOW()`; // DB 연결 확인용 쿼리
  res.json({ message: result });
});

router.use('/studies', studiesRouter);
