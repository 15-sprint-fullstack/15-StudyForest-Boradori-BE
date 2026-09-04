// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '초급 팀 프로젝트 API',
      version: '1.0.0',
      description: '초급 팀 프로젝트 관련 API 문서입니다.',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: '로컬 개발 서버',
      },
    ],
    components: {
      schemas: {
        Study: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '1a561aee-9c6e-46df-80e1-7c39be75de08',
            },
            nickname: { type: 'string', example: '홍길동' },
            name: { type: 'string', example: '매일 운동하기' },
            description: {
              type: 'string',
              example: '하루 30분 운동 습관 만들기',
            },
            background: { type: 'string', nullable: true, example: null },
            point: { type: 'integer', example: 0 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'nickname', 'name', 'description', 'point'],
          // password는 보안상 응답 스키마에서 제외 (아래 설명 참고)
        },
        Habit: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
            },
            name: { type: 'string', example: '물 마시기' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            studyId: {
              type: 'string',
              format: 'uuid',
              example: '1a561aee-9c6e-46df-80e1-7c39be75de08',
            },
          },
          required: ['id', 'name', 'studyId'],
        },
        HabitRecord: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
              description: '습관 기록 고유 ID (자동 생성)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-08-30T00:00:00.000Z',
              description: '기록 날짜 (기본값 없음, 생성 시 직접 지정 필요)',
            },
            habitName: {
              type: 'string',
              example: '물 마시기',
              description:
                '습관 이름 (habit 삭제 후에도 기록에 남도록 별도 저장)',
            },
            habitId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
              description:
                '연결된 habit ID. habit이 삭제되면 null이 됨(SetNull)',
            },
            studyId: {
              type: 'string',
              format: 'uuid',
              example: '1a561aee-9c6e-46df-80e1-7c39be75de08',
              description: '소속된 study ID (필수, study 삭제 시 함께 삭제됨)',
            },
          },
          required: ['id', 'createdAt', 'habitName', 'studyId'],
        },
      },
    },
  },
  // 주석을 스캔할 파일 경로 (라우터 파일들 지정)
  apis: ['./src/routes/*.js', './swagger/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
