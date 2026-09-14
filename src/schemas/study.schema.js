import { z } from 'zod';

// 차후에 길이 정도 제약사항 필요합니다.
export const createStudySchema = z
  .object({
    nickname: z.string().min(1, '닉네임은 필수입니다.').max(20),
    name: z.string().min(1, '스터디 이름은 필수입니다.').max(50),
    description: z.string().min(1, '설명은 필수입니다'),
    background: z.string().optional(),
    password: z.string().min(4, '비밀번호는 4자 이상이여야 합니다'),
  })
  .strict();

// 수정할 때는 선택적으로 적용
export const updateStudySchema = createStudySchema.partial();
