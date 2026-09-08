import express from 'express';
import { prisma } from '#db/prisma.js';
import { createStudySchema, updateStudySchema } from '#schemas';
import { emojiRouter, emojisRouter } from './emojis.route.js';
import { habitRecordsRouter } from './habitRecords.route.js';
import { habitRouter } from './habits.route.js';
import { studyRepository } from '../repositories/studies.repository.js';

export const studiesRouter = express.Router();

// zod 로 파싱해서 에러 핸들러 하는 부분 예시로 적어뒀습니다.
// req.body에 적은 내용 형식이 검증하는 단계입니다.
// 차후 validate가 확실히 정해지면 그 쪽으로 들어갑니다.

studiesRouter.get('/', async (req, res) => {
  const studies = await studyRepository.findAll();
  res.status(200).json(studies);
  return;
});

studiesRouter.get('/:studyId', async (req, res) => {
  const studyId = req.params.studyId;
  const study = await studyRepository.findById(studyId);
  res.status(200).json(study);
  return;
});

studiesRouter.post('/', async (req, res, next) => {
  try {
    const data = createStudySchema.parse(req.body);
    const newStudy = await studyRepository.create(data);
    res.status(201).json(newStudy);
  } catch (error) {
    next(error);
  }
});

studiesRouter.patch('/:studyId', async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const data = updateStudySchema.parse(req.body);
    const updatedStudy = await studyRepository.update(studyId, data);
    res.status(200).json(updatedStudy);
  } catch (error) {
    next(error);
  }
});

studiesRouter.delete('/:studyId', async (req, res) => {
  const studyId = req.params.studyId;
  const deletedStudy = await studyRepository.remove(studyId);
  res.status(200).json(deletedStudy);
  return;
});

//스터디 외에 습관, 습관기록, 이모지 라우팅
//스터디의 API들 보다 밑에 있어야 정상작동
studiesRouter.use(['/:studyId/habit'], habitRouter);
studiesRouter.use(
  ['/:studyId/habit-record', '/habit-record'],
  habitRecordsRouter,
);
studiesRouter.use(['/:studyId/emoji'], emojisRouter);
