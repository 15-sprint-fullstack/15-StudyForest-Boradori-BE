import { BadRequestException } from '../exceptions/bad-request-exception.js';

export const validateStudyQuery = (req, res, next) => {
  try {
    const {
      page = '1',
      limit = '6',
      sort = 'desc',
      sortBy = 'createdAt',
      keyword,
    } = req.query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (
      typeof page !== 'string' ||
      parsedPage < 1 ||
      !Number.isSafeInteger(parsedPage)
    ) {
      throw new BadRequestException(
        '스터디 페이지 값은 1 이상의 정수여야 합니다.',
      );
    }

    if (
      typeof limit !== 'string' ||
      parsedLimit < 1 ||
      parsedLimit > 12 ||
      !Number.isSafeInteger(parsedLimit)
    ) {
      throw new BadRequestException(
        '스터디 리미트 값은 1 이상, 12 이하의 정수여야 합니다.',
      );
    }

    if (!['asc', 'desc'].includes(sort)) {
      throw new BadRequestException(
        '스터디 정렬은 asc 또는 desc로 설정해주세요',
      );
    }

    if (!['createdAt', 'point'].includes(sortBy)) {
      throw new BadRequestException(
        '스터디 정렬 기준을 createdAt 또는 point로 설정해주세요',
      );
    }

    if (keyword !== undefined && typeof keyword !== 'string') {
      throw new BadRequestException('검색어는 문자열이어야 합니다.');
    }
    res.locals.studyQuery = {
      page: parsedPage,
      limit: parsedLimit,
      sort,
      sortBy,
      keyword: keyword?.trim(),
    };

    next();
  } catch (error) {
    next(error);
  }
};
