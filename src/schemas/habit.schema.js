import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z.string().min(1, '습관명은 필수입니다.').max(20, '습관은 최대 20자로 입력해주세요.'),
});

export const updateHabitSchema = createHabitSchema.partial();
// 업데이트시에도 name이 없으면 오류가 반환되도록 partial() 조건을 지우는 건 어떨까요?
// 빈 객체로 업데이트 요청이 오는 오류도 잡을 수 있고,
// createHabitSchema에도 strict() 옵션을 안전하게 추가할 수 있을 것 같습니다.
// (strict 뒤에 partial 옵션을 걸면 strict가 잘 유지되지 않을 수 있다고 함. )
