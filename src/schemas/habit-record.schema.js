import { z } from 'zod';

export const createHabitRecordSchema = z.object({
  habitName: z.string().min(1, '습관명은 필수입니다.').max(20),
  // 현재 데이터 확인용으로 max 내용이 빠져있음
  // 차후 production 단계에서는 max를 오늘로 잡아서 오늘 이후의 날짜는 체크할 수 없게 해야함.
  createdAt: z.coerce.date(),
});

export const updateHabitRecordSchema = createHabitRecordSchema.partial();
