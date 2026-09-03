import { prisma } from '#db/prisma.js';

async function createHabitRecord(studyId, habitId) {
  const now = new Date();

  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
  });

  if (!habit) {
    throw new Error('존재하지 않는 습관입니다.');
  }

  return prisma.habitRecord.create({
    data: {
      studyId,
      habitId,
      habitName: habit.name,
      createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    },
  });
}

function findById(habitRecordId) {
  return prisma.habitRecord.findUnique({
    where: { id: habitRecordId },
  });
}

function findList(studyId, startDate, endDate) {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  console.log('시작날짜:', parsedStartDate, '끝날짜:', parsedEndDate);

  return prisma.habitRecord.findMany({
    where: {
      studyId,
      createdAt: {
        gte: parsedStartDate,
        lte: parsedEndDate,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    distinct: ['habitName'],
  });
}

function findRecord(studyId, habitId, startDate, endDate) {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  console.log('시작날짜:', parsedStartDate, '끝날짜:', parsedEndDate);

  return prisma.habitRecord.findMany({
    where: {
      studyId,
      habitId,
      createdAt: {
        gte: parsedStartDate,
        lte: parsedEndDate,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

function remove(habitRecordId) {
  return prisma.habitRecord.delete({
    where: { id: habitRecordId },
  });
}

export const habitRecordRepository = {
  createHabitRecord,
  findById,
  findList,
  findRecord,
  remove,
};
