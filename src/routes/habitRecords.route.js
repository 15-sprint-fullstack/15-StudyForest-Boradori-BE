import express from 'express';
import { habitRecordRepository } from '#repositories';
import { validateHabitRecord } from '../middlewares/validates/vaildateHabitRecord.middleware.js';

export const habitRecordsRouter = express.Router({ mergeParams: true });

habitRecordsRouter.get('/', validateHabitRecord, async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { startDate, endDate } = req.query;

    console.log('요청받은날짜', startDate, endDate);

    const result = await habitRecordRepository.findList(
      studyId,
      startDate,
      endDate,
    );

    res.status(200).json({
      success: true,
      data: result,
      count: result.length,
      studyId,
      message: '습관기록의 리스트 조회 성공',
    });
  } catch (error) {
    next(error);
  }
});

habitRecordsRouter.post(
  '/:habitId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const { studyId, habitId } = req.params;
      const name = req.name;
      const result = await habitRecordRepository.createHabitRecord(
        studyId,
        habitId,
        name,
      );

      res.status(201).json({
        success: true,
        data: result,
        message: '습관기록 생성 완료',
      });
    } catch (error) {
      next(error);
    }
  },
);

habitRecordsRouter.delete(
  '/:habitRecordId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const { habitRecordId } = req.params;
      const deleteTarget = await habitRecordRepository.remove(habitRecordId);

      res.status(200).json({
        success: true,
        data: deleteTarget,
        message: '습관기록 삭제 완료',
      });
    } catch (error) {
      next(error);
    }
  },
);
