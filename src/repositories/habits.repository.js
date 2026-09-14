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
    data: {
      ...data,
      ...(data.name !== undefined && {
        records: {
          updateMany: {
            where: {},
            data: { habitName: data.name },
          },
        },
      }),
    },
  });
}

function remove(habitId) {
  return prisma.$transaction(async (tx) => {
    // 삭제로 연결이 끊기기 전에 기존 기록에도 마지막 습관 이름을 보존한다.
    const habit = await tx.habit.findUniqueOrThrow({
      where: { id: habitId },
    });
    await tx.habit.update({
      where: { id: habitId },
      data: {
        records: {
          updateMany: {
            where: {},
            data: { habitName: habit.name },
          },
        },
      },
    });
    return tx.habit.delete({
      where: { id: habitId },
    });
  });
}

export const habitsRepository = {
  findByStudyId,
  create,
  update,
  remove,
};
