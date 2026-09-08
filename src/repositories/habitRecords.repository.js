import { fromZonedTime } from 'date-fns-tz';
import { prisma } from '#db/prisma.js';

async function createHabitRecord(studyId, habitId, habitName) {
  return prisma.habitRecord.create({
    data: {
      studyId,
      habitId,
      habitName,
      createdAt: new Date(), //개발용 현재 시간 생성 배포전 삭제 및 데이터 스키마 수정 필요
    },
  });
}

function findById(habitRecordId) {
  return prisma.habitRecord.findUnique({
    where: { id: habitRecordId },
  });
}

function findList(studyId, startDate, endDate) {
  const utcStartDate = fromZonedTime(startDate, 'Asia/Seoul');
  const utcEndtDate = fromZonedTime(endDate, 'Asia/Seoul');

console.log('변환된시간:',utcStartDate, utcEndtDate);

  return prisma.habitRecord.findMany({
    where: {
      studyId,
      createdAt: {
        gte: utcStartDate,
        lte: utcEndtDate,
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

export const habitRecordsRepository = {
  createHabitRecord,
  findById,
  findList,
  remove,
};
