import { HttpException } from './http-exception.js';
import { HTTP_STATUS } from '#constants';

export class NotFoundException extends HttpException {
  constructor(description = 'NOT_FOUND') {
    super(HTTP_STATUS.NOT_FOUND, description);
  }
}
