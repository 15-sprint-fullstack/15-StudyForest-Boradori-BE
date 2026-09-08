import express from 'express';
import { studiesRepository } from '#repositories';
import { createStudySchema, updateStudySchema } from '#schemas';
import { emojisRouter } from './emojis.route.js';
import { habitRecordsRouter } from './habitRecords.route.js';
import { habitsRouter } from './habits.route.js';

export const studiesRouter = express.Router();

// zod 로 파싱해서 에러 핸들러 하는 부분 예시로 적어뒀습니다.
// req.body에 적은 내용 형식이 검증하는 단계입니다.
// 차후 validate가 확실히 정해지면 그 쪽으로 들어갑니다.

studiesRouter.get('/', async (req, res, next) => {
  try {
    const { keyword, sort, sortBy } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const [studies, totalCount] = await Promise.all([
      studiesRepository.find(page, limit, sort, sortBy, keyword),
      studiesRepository.count(keyword),
    ]);
    res.status(200).json({
      success: true,
      data: studies,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      message: '스터디목록 불러오기 완료',
    });
  } catch (error) {
    next(error);
  }
});

studiesRouter.get('/:studyId', async (req, res, next) => {
  try {
    const study = await studiesRepository.findById(req.params.studyId);
    res.status(200).json({
      success: true,
      data: study,
      message: '스터디를 찾았습니다.',
    });
  } catch (error) {
    next(error);
  }
});

studiesRouter.post('/', async (req, res, next) => {
  try {
    const data = createStudySchema.parse(req.body);
    const newStudy = await studiesRepository.create(data);
    res.status(201).json({
      success: true,
      data: newStudy,
      message: '스터디 생성 완료',
    });
  } catch (error) {
    next(error);
  }
});

studiesRouter.patch('/:studyId', async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const data = updateStudySchema.parse(req.body);
    const updatedStudy = await studiesRepository.update(studyId, data);
    res.status(200).json({
      success: true,
      data: updatedStudy,
      message: '스터디 업데이트 완료',
    });
  } catch (error) {
    next(error);
  }
});

studiesRouter.delete('/:studyId', async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const deletedStudy = await studiesRepository.remove(studyId);
    res.status(200).json({
      success: true,
      data: deletedStudy,
      message: '스터디 삭제 완료',
    });
  } catch (error) {
    next(error);
  }
});

//스터디 외에 습관, 습관기록, 이모지 라우팅
//스터디의 API들 보다 밑에 있어야 정상작동
studiesRouter.use(['/:studyId/habits'], habitsRouter);
studiesRouter.use(
  ['/:studyId/habit-records', '/habit-records'],
  habitRecordsRouter,
);
studiesRouter.use(['/:studyId/emojis'], emojisRouter);
