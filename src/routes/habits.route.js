import express from 'express';
import { habitRepository } from '../repositories/habits.repository.js';

export const habitRouter = express.Router({ mergeParams: true });

habitRouter.get('/:habitId', async (req, res) => {
  const { studyId, habitId } = req.params;
  console.log(req.params.studiesId, req.params.habitId);
  res.status(200).json({
    message: '습관의 studyId와 habitId 체크입니다.',
    studyId,
    habitId,
  });
});

habitRouter.get('/', async (req, res) => {
  const studyId = req.params.studyId;
  const habits = await habitRepository.findByStudyId(studyId);
  res.status(200).json(habits);
  return;
})

habitRouter.post('/', async (req, res) => {
  const studyId = req.params.studyId;
  const data = req.body;
  const newHabit = await habitRepository.create(studyId, data);
  res.status(201).json(newHabit);
  return;
})

habitRouter.patch('/:habitId', async (req, res) => {
    const habitId = req.params.habitId;
    const data = req.body;
    const updatedHabit = await habitRepository.update(habitId, data);
    res.status(200).json(updatedHabit);
    return;
})

habitRouter.delete('/:habitId', async (req, res) => {
    const habitId = req.params.habitId;
    const deletedHabit = await habitRepository.remove(habitId);
    res.status(200).json(deletedHabit);
    return;
})
