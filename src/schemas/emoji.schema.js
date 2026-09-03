import { z } from 'zod';

export const createEmojiSchema = z.object({
  emojiType: z.string.min(1, '이모지는 필수입니다.').max(20),
});
