import express from 'express';
import { emojiRouter } from './emojis.route.js';
import { habitRecordsRouter } from './habitRecords.route.js';
import { habitRouter } from './habits.route.js';

export const studiesRouter = express.Router();

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
studiesRouter.use(['/:studiesId/habit'], habitRouter);
studiesRouter.use(['/:studiesId/habit-record'], habitRecordsRouter);
studiesRouter.use(['/:studiesId/emoji'], emojiRouter);
