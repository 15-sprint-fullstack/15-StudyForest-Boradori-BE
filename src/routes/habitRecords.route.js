import express from 'express';
import { validateHabitRecord } from '#middlewares';
import { habitRecordsRepository } from '#repositories';

export const habitRecordsRouter = express.Router({ mergeParams: true });

habitRecordsRouter.get('/', validateHabitRecord, async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { startDate, endDate } = req.query;

    console.log('요청받은날짜', startDate, endDate);

    const result = await habitRecordsRepository.findList(
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
      const result = await habitRecordsRepository.createHabitRecord(
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

habitRecordsRouter.patch(
  '/:habitId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const habitId = req.params.habitId;
      const name = req.body.name;
      const updatedHabitName = await habitRecordsRepository.updateAllByName(
        habitId,
        name,
      );
      res.status(200).json({
        success: true,
        data: updatedHabitName,
        message: '습관이름 업데이트 완료',
      });
    } catch (error) {
      next(error);
    }
  },
);

habitRecordsRouter.delete(
  '/:habitId',
  validateHabitRecord,
  async (req, res, next) => {
    try {
      const { studyId, habitId } = req.params;
      const { startDate, endDate } = req.query;
      const deletedTarget = await habitRecordsRepository.remove(
        studyId,
        habitId,
        startDate,
        endDate,
      );
      res.status(200).json({
        success: true,
        data: deletedTarget[0],
        message: '습관기록 삭제 완료',
      });
    } catch (error) {
      next(error);
    }
  },
);

// 기존 습관기록 삭제 코드 (새로운 코드 작동 잘 되면 삭제)
// habitRecordsRouter.delete(
//   '/:habitRecordId',
//   validateHabitRecord,
//   async (req, res, next) => {
//     try {
//       const { habitRecordId } = req.params;
//       const deleteTarget = await habitRecordsRepository.remove(habitRecordId);

//       res.status(200).json({
//         success: true,
//         data: deleteTarget,
//         message: '습관기록 삭제 완료',
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// );
