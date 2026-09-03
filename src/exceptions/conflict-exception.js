import { HttpException } from './http-exception.js';
import { HTTP_STATUS } from '#constants';

export class ConflictException extends HttpException {
  constructor(description = 'CONFLICT') {
    super(HTTP_STATUS.CONFLICT, description);
  }
}
