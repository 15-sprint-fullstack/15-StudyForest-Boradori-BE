import express from 'express';
import { prisma } from '#db/prisma.js';
import { studiesRouter } from './studies.route.js';
import { createStudySchema } from '../schemas/study.schema.js';

export const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await prisma.$queryRaw`SELECT NOW()`; // DB 연결 확인용 쿼리
  res.json({ message: result });
});

router.use('/studies', studiesRouter);
