import { prisma } from '#db/prisma.js';
import { emojiTranscation } from '#utils';

function findByStudyId(studyId) {
  return prisma.emoji.findMany({
    where: { studyId: studyId },
  });
}

// 이거는 이제 완전 새로운 데이터를 받는 거고, 기존에 있으면 플러스하는 방향을 해야하는데.
// 그러면 이번에는 새롭게 upsert를 써볼까요? -> 하려다가 limti 제한 값 생각하고 분기로 나눔
// 뭔가 더 좋은 방법이 있을 것 같은데
function createOrIncreaseCount({ studyId, emojiType }) {
  return emojiTranscation(async (tx) => {
    const emoji = await tx.emoji.findUnique({
      where: {
        studyId_emojiType: { studyId, emojiType },
      },
    });

    if (!emoji) {
      return tx.emoji.create({
        data: {
          studyId,
          emojiType,
          count: 1,
        },
      });
    }

    if (emoji.count >= 100) {
      throw new Error('이모지는 최대 100개까지 추가할 수 있습니다.');
    }

    return tx.emoji.update({
      where: { id: emoji.id },
      data: {
        count: { increment: 1 },
      },
    });
  });
}
// 삭제와 감소 기능이 함께 있는 것.
// 0이 되면 삭제, 아니라면 1씩 감소
function deleteOrDecreaseCount({ studyId, emojiType }) {
  return emojiTranscation(async (tx) => {
    const where = {
      studyId_emojiType: { studyId, emojiType },
    };

    const emoji = await tx.emoji.findUnique({ where });
    console.log(emoji);
    await tx.emoji.update({
      where: {
        studyId,
        emojiType,
        count: { gt: 0 },
      },
      data: {
        count: { decrement: 1 },
      },
    });

    const deleted = await tx.emoji.deleteMany({
      where: {
        studyId,
        emojiType,
        count: 0,
      },
    });

    return deleted;
  });
}

export const emojisRepository = {
  findByStudyId,
  createOrIncreaseCount,
  deleteOrDecreaseCount,
};
