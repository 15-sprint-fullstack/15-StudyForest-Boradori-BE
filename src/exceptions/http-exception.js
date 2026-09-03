export class HttpException extends Error {
  statusCode;

  constructor(statusCode, description) {
    super(description);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
