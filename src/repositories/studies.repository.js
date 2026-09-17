import { prisma } from '#db/prisma.js';

function findAll(page, limit, sort, sortBy, keyword) {
  const validSort = sort === 'asc' ? 'asc' : 'desc';
  const validSortBy = sortBy === 'point' ? 'point' : 'createdAt';
  return prisma.study.findMany({
    where: keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { nickname: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {},
    skip: (page - 1) * limit,
    take: limit,
    orderBy: [{ [validSortBy]: validSort }, { id: 'asc' }],
  });
}

function findById(studyId) {
  return prisma.study.findUnique({
    where: { id: studyId },
  });
}

// 인증용 구간 추가 - password omit 설정 false 를 위해 존재
function findByIdForAccess(studyId) {
  return prisma.study.findUnique({
    where: { id: studyId },
    omit: { password: false },
  });
}

function count(keyword) {
  return prisma.study.count({
    where: keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { nickname: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {},
  });
}

function create(data) {
  return prisma.study.create({
    data,
  });
}

function update(studyId, data) {
  return prisma.study.update({
    where: { id: studyId },
    data,
  });
}

function remove(studyId) {
  return prisma.study.delete({
    where: { id: studyId },
  });
}

export const studiesRepository = {
  findAll,
  findById,
  findByIdForAccess,
  count,
  create,
  update,
  remove,
};
