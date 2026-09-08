import express from 'express';
import { validateHabit } from '#middlewares';
import { validateStudy } from '#middlewares';
import { habitsRepository } from '#repositories';
import { createHabitSchema, updateHabitSchema } from '#schemas';

export const habitsRouter = express.Router({ mergeParams: true });

// habitRouter.get('/:habitId', validateStudy, validateHabit, async (req, res) => {
//   const { studyId, habitId } = req.params;
//   console.log(req.params.studiesId, req.params.habitId);
//   res.status(200).json({
//     message: '습관의 studyId와 habitId 체크입니다.',
//     studyId,
//     habitId,
//   });
// });

habitsRouter.get('/', validateStudy, validateHabit, async (req, res) => {
  const studyId = req.params.studyId;
  const habits = await habitsRepository.findByStudyId(studyId);
  res.status(200).json({
    message: '습관 목록 호출 성공',
    success: true,
    data: { totalCount: habits.length, list: habits },
  });
  return;
});

habitsRouter.post('/', validateStudy, validateHabit, async (req, res) => {
  const studyId = req.params.studyId;
  const validatedData = createHabitSchema.parse(req.body);
  const newHabit = await habitsRepository.create(studyId, validatedData);
  res.status(201).json({
    message: '습관 생성 성공',
    success: true,
    data: newHabit,
  });
  return;
});

habitsRouter.patch(
  '/:habitId',
  validateStudy,
  validateHabit,
  async (req, res) => {
    const habitId = req.params.habitId;
    const validatedData = updateHabitSchema.parse(req.body);
    const updatedHabit = await habitsRepository.update(habitId, validatedData);
    res.status(200).json({
      message: '습관 업데이트 성공',
      success: true,
      data: updatedHabit,
    });
    return;
  },
);

habitsRouter.delete(
  '/:habitId',
  validateStudy,
  validateHabit,
  async (req, res) => {
    const habitId = req.params.habitId;
    const deletedHabit = await habitsRepository.remove(habitId);
    res.status(200).json({
      message: '습관 삭제 성공',
      success: true,
      data: deletedHabit,
    });
    return;
  },
);
