import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z.string().min(1, '습관명은 필수입니다.').max(20),
});

export const updateHabitSchema = createHabitSchema.partial();
