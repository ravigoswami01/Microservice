import { config } from "dotenv";
import { resolve } from "node:path";
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { AppError, errorHandlear, httpLoger, logger, successResponse } from "shared";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

const PORT = process.env.TASK_PORT || 3002;

const app = express();

app.use(httpLoger);
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    successResponse(res, { service: "task_service" });
});

app.use((_req, _res, next: NextFunction) => {
    next(new AppError(404, "Router not found"));
});

app.use(errorHandlear);

app.listen(PORT, () => {
    logger.info(`Task service running on port ${PORT}`);
});
