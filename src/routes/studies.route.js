import express from 'express';
import { prisma } from '#db/prisma.js';
import { createStudySchema } from '#schemas';
import { emojiRouter } from './emojis.route.js';
import { habitRecordsRouter } from './habitRecords.route.js';
import { habitRouter } from './habits.route.js';

export const studiesRouter = express.Router();

// zod 로 파싱해서 에러 핸들러 하는 부분 예시로 적어뒀습니다.
// req.body에 적은 내용 형식이 검증하는 단계입니다.
// 차후 validate가 확실히 정해지면 그 쪽으로 들어갑니다.

// 예시로 넣어뒀으니 작업하실 때 사용하시고, 삭제 하시거나 주석으로 처리해주세요.
studiesRouter.post('/test', async (req, res, next) => {
  try {
    const validated = createStudySchema.parse(req.body);
    const study = await prisma.study.create({ data: validated });
    res.json(study);
  } catch (error) {
    next(error);
  }
});

studiesRouter.get('/', async (req, res) => {
  res.status(200).json({
    message: '스터디입니다.',
  });
});

/*


    스터디 관련 API 개발 공간


*/

//스터디 외에 습관, 습관기록, 이모지 라우팅
//스터디의 API들 보다 밑에 있어야 정상작동
studiesRouter.use(['/:studyId/habit'], habitRouter);
studiesRouter.use(['/:studyId/habit-record'], habitRecordsRouter);
studiesRouter.use(['/:studyId/emoji'], emojiRouter);
