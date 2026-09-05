import express from 'express';
import { createHabitSchema, updateHabitSchema } from '#schemas';
import { validateHabit } from '../middlewares/validate-habit.middleware.js';
import { validateStudy } from '../middlewares/validate-study.middleware.js';
import { habitRepository } from '../repositories/habits.repository.js';
export const habitRouter = express.Router({ mergeParams: true });

// habitRouter.get('/:habitId', validateStudy, validateHabit, async (req, res) => {
//   const { studyId, habitId } = req.params;
//   console.log(req.params.studiesId, req.params.habitId);
//   res.status(200).json({
//     message: '습관의 studyId와 habitId 체크입니다.',
//     studyId,
//     habitId,
//   });
// });

habitRouter.get('/', validateStudy, validateHabit, async (req, res) => {
  const studyId = req.params.studyId;
  const habits = await habitRepository.findByStudyId(studyId);
  res.status(200).json({
    message: "습관 목록 호출 성공",
    success: true,
    data: { totalCount: habits.length, list: habits },
  });
  return;
});

habitRouter.post('/', validateStudy, validateHabit, async (req, res) => {
  const studyId = req.params.studyId;
  const validatedData = createHabitSchema.parse(req.body);
  const newHabit = await habitRepository.create(studyId, validatedData);
  res.status(201).json({
    message: "습관 생성 성공",
    success: true,
    data: newHabit
  });
  return;
});

habitRouter.patch('/:habitId', validateStudy, validateHabit, async (req, res) => {
  const habitId = req.params.habitId;
  const validatedData = updateHabitSchema.parse(req.body);
  const updatedHabit = await habitRepository.update(habitId, validatedData);
  res.status(200).json({
    message: "습관 업데이트 성공",
    success: true,
    data: updatedHabit
  });
  return;
});

habitRouter.delete('/:habitId', validateStudy, validateHabit, async (req, res) => {
  const habitId = req.params.habitId;
  const deletedHabit = await habitRepository.remove(habitId);
  res.status(200).json({
    message: "습관 삭제 성공",
    success: true,
    data: deletedHabit
  });
  return;
});
