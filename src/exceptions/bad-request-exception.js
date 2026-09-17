import { HttpException } from './http-exception.js';
import { HTTP_STATUS } from '#constants';

export class BadRequestException extends HttpException {
  constructor(description = 'BAD_REQUEST') {
    super(HTTP_STATUS.BAD_REQUEST, description);
  }
}
