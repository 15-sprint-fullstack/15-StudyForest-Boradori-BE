import { prisma } from '#db/prisma.js';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const validateStudy = async (req, _res, next) => {
  const { studyId } = req.params;
  if (!studyId) {
    throw new BadRequestException('스터디 id 입력값이 없습니다.');
  }

  const study = await prisma.study.findUnique({
    where: { id: studyId },
  });
  if (!study) {
    throw new NotFoundException('요청하신 스터디 id가 존재하지 않습니다.');
  }

  next();
};
