import { prisma } from '#db/prisma.js';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { ConflictException } from '../exceptions/conflict-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

const HABITS_LIMIT = 18;

export const validateHabit = async (req, _res, next) => {
  const { studyId, habitId } = req.params;

  const checkHabitId = () => {
    if (!habitId) {
      throw new BadRequestException('습관 id 입력값이 없습니다.');
    }
  };
  const checkHabit = async () => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) {
      throw new NotFoundException('찾으시는 습관이 존재하지 않습니다.');
    }
  };
  const checkRelation = async () => {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (habit.studyId !== studyId) {
      throw new BadRequestException(
        '요청하신 스터디에 해당하는 습관이 아닙니다.',
      );
    }
  };

  const checkRedundancy = async () => {
    const { name } = req.body ?? {};

    // 미들웨어 통과후 조드로 검증하는 단계가 있지만, 습관명 중복체크 함수가 정상 동작하려면 여기에서도 !name을 검증합니다.
    if (!name) {
      throw new BadRequestException('습관명은 필수입니다.');
    }

    const redundancy = await prisma.habit.findFirst({
      where: { studyId, name },
    });
    if (redundancy) {
      throw new ConflictException('해당 스터디에 이미 존재하는 습관입니다.');
    }
  };

  const checkCount = async () => {
    const habitCount = await prisma.habit.count({
      where: { studyId },
    });
    if (habitCount >= HABITS_LIMIT) {
      throw new BadRequestException('습관은 최대 18개까지 작성 가능합니다.');
    }
  };

  // 하나의 검증 미들웨어에서 메서드별로 나눴고. 현재 GET 메서드는 스터디별 목록으로만 조회한다고 판단하여 habit단계 검증함수 호출이 없습니다.
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      await checkCount();
      await checkRedundancy();
      break;
    case 'PATCH':
      checkHabitId();
      await checkHabit();
      await checkRelation();
      await checkRedundancy();
      break;
    case 'DELETE':
      checkHabitId();
      await checkHabit();
      await checkRelation();
      break;
    default:
      break;
  }

  next();
};

// checkHabitId는 사실 거의 죽은 코드라고 합니다. (study 검증 미들웨어의 !studyId 체크도 마찬가지.)
// URL 경로 파라미터에 studyId나 habitId가 비어있으면 해당 라우트에 매칭 자체가 되지 않기 때문입니다.
// 방어코드로 남겨놓아도 오류가 나지는 않는 부분이라 지금은 일단 남겨놓았습니다.
// 불필요하다는 의견에 따라 삭제하고자 합니다. 