import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z.string().min(1, '습관명은 필수입니다.').max(20, '습관은 최대 20자로 입력해주세요.'),
});

export const updateHabitSchema = createHabitSchema.partial();
// 업데이트시에도 name은 필요하지 않은지?
