import { config } from "dotenv";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { resolve } from "node:path";
import { AppError, errorHandlear, httpLoger, successResponse } from "shared";
import authRouter from "./routes/auth.router"

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

const PORT = process.env.AUTH_PORT || 3001;

const app = express();

app.use(httpLoger);
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  successResponse(res, { service: "auth_service" });
});

app.use("/auth", authRouter)

app.use((_req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, "Router not found"));
});

app.use(errorHandlear);

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
