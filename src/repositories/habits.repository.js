import { prisma } from '#db/prisma.js';

function findByStudyId(studyId) {
  return prisma.habit.findMany({
    where: { studyId },
  });
}

function create(studyId, data) {
  return prisma.habit.create({
    data: {
      ...data,
      studyId,
    },
  });
}

function update(habitId, data) {
  return prisma.habit.update({
    where: { id: habitId },
    data,
  });
}

function remove(habitId) {
  return prisma.habit.delete({
    where: { id: habitId },
  });
}

export const habitRepository = {
  findByStudyId,
  create,
  update,
  remove,
};
