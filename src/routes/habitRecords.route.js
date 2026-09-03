import express from 'express';
import { habitRecordRepository } from '#repositories';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const habitRecordsRouter = express.Router({ mergeParams: true });

habitRecordsRouter.get('/', async (req, res) => {
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
});

habitRecordsRouter.get('/:habitId', async (req, res) => {
  const { studiesId, habitId } = req.params;
  const { startDate, endDate } = req.query;
  const result = await habitRecordRepository.findRecord(
    studiesId,
    habitId,
    startDate,
    endDate,
  );
  res.status(200).json({
    success: true,
    data: result,
    count: result.length,
    studiesId,
    message: '습관기록 조회 성공',
  });
});

habitRecordsRouter.post('/:habitId', async (req, res, next) => {
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
});

habitRecordsRouter.delete('/:habitRecordId', async (req, res, next) => {
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
});
