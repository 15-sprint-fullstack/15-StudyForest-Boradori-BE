import { prisma } from '#db/prisma.js';

function createHabitRecord(data) {
  return prisma.product.create({ data });
}

function findList(studiesId, startDate, endDate) {
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.log('유효하지 않은 날짜입니다.');
    return;
  } else {
    console.log('유효한 날짜:', startDate, endDate);
  }
  return prisma.habitRecord.findMany({
    where: {
    createdAt: {
      gte: new Date(startDate),
      lte: new Date(endDate),
    },
  }});
}
