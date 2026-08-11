import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export function errorHandlear(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // for logging

  return res.status(500).json({
    success: false,
    message: "Invalid server error",
  });
}
