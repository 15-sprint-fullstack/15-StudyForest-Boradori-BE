import { HttpException } from './http-exception.js';
import { HTTP_STATUS } from '#constants';

export class Unauthorized extends HttpException {
  constructor(description = 'UNAUTHORIZED') {
    super(HTTP_STATUS.UNAUTHORIZED, description);
  }
}
