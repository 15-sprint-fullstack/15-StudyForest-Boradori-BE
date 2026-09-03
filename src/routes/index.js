import express from 'express';
import { createStudySchema } from '../schemas/study.schema.js';
import { studiesRouter } from './studies.route.js';
import { prisma } from '#db/prisma.js';

export const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await prisma.$queryRaw`SELECT NOW()`; // DB 연결 확인용 쿼리
  res.json({ message: result });
});

router.use('/studies', studiesRouter);

// zod 로 파싱해서 에러 핸들러 하는 부분 예시로 적어뒀습니다.
// req.body에 적은 내용 형식이 검증하는 단계입니다.
// 차후 validate가 확실히 정해지면 그 쪽으로 들어갑니다.

// 예시로 넣어뒀으니 작업하실 때 사용하시고, 삭제 하시거나 주석으로 처리해주세요.
router.post('/studies', async (req, res, next) => {
  try {
    const validated = createStudySchema.parse(req.body);
    const study = await prisma.study.create({ data: validated });
    res.json(study);
  } catch (error) {
    next(error);
  }
});
