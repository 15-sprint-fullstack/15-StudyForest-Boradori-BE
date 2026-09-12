import emojiRegex from 'emoji-regex';
import { z } from 'zod';

export const createEmojiSchema = z.object({
  emojiType: z
    .string()
    .min(1, '이모지는 필수입니다.')
    .refine((value) => {
      const matches = value.match(emojiRegex());

      // 이모지 하나만 발견됐는지, 딱 하나의 이모지만 들어왔는지.
      return matches?.length === 1 && matches[0] === value;
    }, '이모지 하나만 입력해 주세요.'),
});
