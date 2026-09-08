import { prisma } from '#db/prisma.js';

function findAll() {
  return prisma.study.findMany();
}

function findById(studyId) {
  return prisma.study.findUnique({
    where: { id: studyId },
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

export const studyRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
