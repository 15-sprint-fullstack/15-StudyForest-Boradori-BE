import { prisma } from '#db/prisma.js';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { ConflictException } from '../exceptions/conflict-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const validateHabit = async (req, _res, next) => {
  const { studyId, habitId } = req.params;
  const habitIdCheck = () => {
    if (!habitId) {
      throw new BadRequestException('습관 id 입력값이 없습니다.');
    }
  };
  const habitCheck = async () => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) {
      throw new NotFoundException('찾으시는 습관이 존재하지 않습니다.');
    }
  };
  const relationCheck = async () => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (habit.studyId !== studyId) {
      throw new BadRequestException(
        '요청하신 스터디에 해당하는 습관이 아닙니다.',
      );
    }
  };
  const redundancyCheck = async () => {
    const { name } = req.body;
    const redundancy = await prisma.habit.findFirst({
      where: { studyId, name },
    });
    if (redundancy) {
      throw new ConflictException('해당 스터디에 이미 존재하는 습관입니다.');
    }
  };

  // 하나의 검증 미들웨어에서 메서드별로 나눴고. 현재 GET 메서드는 스터디별 목록으로만 조회한다고 판단하여 habit단계 검증함수 호출이 없습니다.
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      await redundancyCheck();
      break;
    case 'PATCH':
      habitIdCheck();
      await habitCheck();
      await relationCheck();
      await redundancyCheck();
      break;
    case 'DELETE':
      habitIdCheck();
      await habitCheck();
      await relationCheck();
      break;
    default:
      break;
  }

  next();
};
