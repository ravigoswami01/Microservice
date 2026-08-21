import { config } from "dotenv"
import path, { resolve } from "node:path"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import ratelimit, { MINUTE } from "express-rate-limit";
import { AppError, errorHandlear, httpLoger, logger, successResponse } from "shared"
import { createProxyMiddleware } from "http-proxy-middleware"





config({ path: resolve(process.cwd(), ".env") })
config({ path: resolve(process.cwd(), "../../.env") })


const PORT = process.env.PORT || 3000;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4000"


const app = express()

// secure http header
app.use(helmet())
app.use(cors())
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

// create proxy 
// auth proxt => :4001/auth/* gatway


app.use("/auth",
    createProxyMiddleware({
        target: AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: (path) => `/auth${path}`
    }),
)

app.use((_req, _res, next) => {
    next(new AppError(404, "Router not found"))
})

app.use(errorHandlear)

app.listen(PORT, () => {
    logger.info(`API getway running for port ${PORT}`)
})



