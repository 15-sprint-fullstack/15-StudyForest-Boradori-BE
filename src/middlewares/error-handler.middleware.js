import { z } from 'zod';
import { HttpException } from '../exceptions/http-exception.js';
import { HTTP_STATUS } from '#constants';
import { Prisma } from '#generated/prisma/client.ts';

export const errorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  console.error(
    `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${error.name}: ${error.message}`,
  );

  //JSON 파싱 오류
  if (
    error instanceof SyntaxError &&
    error.status === HTTP_STATUS.BAD_REQUEST
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      sucesss: false,
      message: '요청 본문이 올바른 JSON 형식이 아닙니다.',
    });
  }

  // HttpException 관련 에러
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Prisma 에러
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: '이미 사용 중인 값입니다.',
        });

      case 'P2003':
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: '연결된 리소스가 존재하지 않습니다.',
        });

      case 'P2025':
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: '요청한 리소스를 찾을 수 없습니다.',
        });
      default:
        break;
    }
  }

  // req body 형식 에러
  if (error instanceof z.ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: '요청 데이터가 올바르지 않습니다',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const result = {
    success: false,
    message: 'Internal Server Error',
  };
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(result);
};
