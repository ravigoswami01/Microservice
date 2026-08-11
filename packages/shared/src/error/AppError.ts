export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperation: boolean;

  constructor(statusCode: number, message: string, isOperation = true) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperation = isOperation;
  }
}
