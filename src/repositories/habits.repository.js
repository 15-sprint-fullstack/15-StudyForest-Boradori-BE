import { prisma } from '#db/prisma.js';

function findHabitsByStudyId(studyId) {
  return prisma.habit.findMany({
    where: { studyId },
  });
}

function createHabit(studyId, data) {
  return prisma.habit.create({
    data: {
      ...data,
      studyId,
    },
  });
}

function updateHabit(habitId, data) {
  return prisma.habit.update({
    where: { id: habitId },
    data,
  });
}

function deleteHabit(habitId) {
  return prisma.habit.delete({
    where: { id: habitId },
  });
}

export const habitRepository = {
  findHabitsByStudyId,
  createHabit,
  updateHabit,
  deleteHabit,
};
