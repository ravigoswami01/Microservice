import { pinoHttp } from "pino-http";
import { logger } from "./looger";

export const httpLoger = pinoHttp({
  logger,
});
