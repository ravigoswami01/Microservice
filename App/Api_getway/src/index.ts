import { config } from "dotenv"
import path, { resolve } from "node:path"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import ratelimit, { MINUTE } from "express-rate-limit";
import { AppError, errorHandlear, httpLoger, logger, successResponse } from "shared"
import { createProxyMiddleware } from "http-proxy-middleware"
import { gatewayAuth } from "./middleware/gatwayAuth"


config({ path: resolve(process.cwd(), ".env") })
config({ path: resolve(process.cwd(), "../../.env") })

const PORT = process.env.GATEWAY_PORT || process.env.PORT || 3000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4000";


const app = express()

// secure http header
app.use(helmet())
app.use(cors({
    origin: "http://localhost:4000",
    credentials: true
}))

app.use(ratelimit({
    windowMs: 15 * MINUTE,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false

}))

app.use(httpLoger)

app.use("/health", (_req, res) => {
    successResponse(res, { service: "api_getway" });
})



app.use(
    "/auth",
    gatewayAuth,
    createProxyMiddleware({
        target: AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (reqPath) => {
            // the auth service expects the full /auth/* route, not just /login or /me
            return reqPath.startsWith("/auth") ? reqPath : `/auth${reqPath}`;
        },
    }),
);

app.use((_req, _res, next) => {
    next(new AppError(404, "Router not found"))
})

app.use(errorHandlear)

app.listen(PORT, () => {
    logger.info(`API getway running for port ${PORT}`)
})



