import { BadRequestException } from '../exceptions/bad-request-exception.js';

export const validateHabitRecord = (req, res, next) => {
  try {
    const { method } = req;
    const { studyId, habitId, habitRecordId } = req.params;
    const { startDate, endDate } = req.query;
    console.log('검증중인 파람스',req.params)

    switch (method) {
      case 'GET': {
        if (!studyId && !habitId) {
          throw new BadRequestException('studyId 또는 habitId는 필수 입니다.');
        } else if (!startDate || !endDate) {
          throw new BadRequestException('시작날짜와 끝날짜는 필수 입니다.');
        }
        break;
      }
      case 'POST': {
        if (!studyId && !habitId) {
          throw new BadRequestException('studyId 또는 habitId는 필수 입니다.');
        }
        break;
      }
      case 'DELETE': {
        if (!habitRecordId) {
          throw new BadRequestException('삭제할 습관기록의 ID를 입력하세요.');
        }
        break;
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
