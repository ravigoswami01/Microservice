import { config } from "dotenv";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { resolve } from "node:path";
import { AppError, errorHandlear, httpLoger, successResponse, initPool, requireGatwaySecret } from "shared";
import authRouter from "./routes/auth.router"

const envPath = resolve(process.cwd(), "../../.env");
config({ path: envPath });

console.log("Loaded AUTH_PORT:", process.env.AUTH_PORT);

const PORT = process.env.AUTH_PORT || 3001;

const app = express();

app.use(httpLoger);
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  successResponse(res, { service: "auth_service" });
});

app.use("/auth", requireGatwaySecret, authRouter)

app.use((_req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, "Router not found"));
});

app.use(errorHandlear);

initPool()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Auth service listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });
