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
  const utcStartDate = fromZonedTime(`${startDate}T00:00:00.000`, 'Asia/Seoul');
  const utcEndDate = fromZonedTime(`${endDate}T23:59:59.999`, 'Asia/Seoul');

  console.log('변환된시간:', utcStartDate, utcEndDate);

  return prisma.habitRecord.findMany({
    where: {
      studyId,
      createdAt: {
        gte: utcStartDate,
        lte: utcEndDate,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

function updateAllByName(habitId, habitName) {
  return prisma.habitRecord.updateMany({
    where: { habitId },
    data: { habitName },
  });
}

function remove(studyId, habitId, startDate, endDate) {
  const utcStartDate = fromZonedTime(startDate, 'Asia/Seoul');
  const utcEndDate = fromZonedTime(endDate, 'Asia/Seoul');
  return prisma.habitRecord.deleteMany({
    where: {
      studyId,
      habitId,
      createdAt: {
        gte: utcStartDate,
        lte: utcEndDate,
      },
    },
  })
}

export const habitRecordsRepository = {
  createHabitRecord,
  findById,
  findList,
  updateAllByName,
  remove,
};
