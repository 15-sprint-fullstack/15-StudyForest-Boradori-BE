import { prisma } from '#db/prisma.js';
import { createEmojiSchema } from '#schemas';
import { NotFoundException } from '../exceptions/not-found-exception.js';

export const validateEmoji = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { emojiType } = createEmojiSchema.parse(req.body);

    const emojiData = await prisma.emoji.findUnique({
      where: { studyId_emojiType: { studyId, emojiType } },
    });

    if (!emojiData) {
      throw new NotFoundException('해당 이모지가 존재하지 않습니다.');
    }

    next();
  } catch (error) {
    next(error);
  }
};
