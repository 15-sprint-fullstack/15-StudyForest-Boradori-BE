import express from 'express';
import { habitRecordRepository } from '#repositories';
import { NotFoundException } from '../exceptions/not-found-exception.js';
import { validateHabitRecord } from '../middlewares/vaildateHabitRecord.middleware.js';

export const habitRecordsRouter = express.Router({ mergeParams: true });

habitRecordsRouter.get('/', validateHabitRecord, async (req, res, next) => {
  try {
    const { studiesId } = req.params;
    const { startDate, endDate } = req.query;
    const result = await habitRecordRepository.findList(
      studiesId,
      startDate,
      endDate,
    );
    res.status(200).json({
      success: true,
      data: result,
      count: result.length,
      studiesId,
      message: '습관기록의 리스트 조회 성공',
    });
  } catch (error) {
    next(error);
  }
});

habitRecordsRouter.get(
  '/:habitId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const { habitId } = req.params;
      const { startDate, endDate } = req.query;
      const result = await habitRecordRepository.findRecord(
        habitId,
        startDate,
        endDate,
      );
      res.status(200).json({
        success: true,
        data: result,
        count: result.length,
        message: '습관기록 조회 성공',
      });
    } catch (error) {
      next(error);
    }
  },
);

habitRecordsRouter.post(
  '/:habitId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const { studiesId, habitId } = req.params;
      const result = await habitRecordRepository.createHabitRecord(
        studiesId,
        habitId,
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
      const target = habitRecordRepository.findById(habitRecordId);
      if (!target) {
        throw new NotFoundException('습관기록을 찾을 수 없음');
      }

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
