import { HttpException } from './http-exception.js';
import { HTTP_STATUS } from '#constants';

export class Forbidden extends HttpException {
  constructor(description = 'FORBIDDEN') {
    super(HTTP_STATUS.FORBIDDEN, description);
  }
}
