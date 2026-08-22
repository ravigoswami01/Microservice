import type { Request, Response, NextFunction } from "express";
import { AppError, verifyToken } from "shared";
import { gatAllowedRoles, isPublicRoutes } from "../rbac";

const IDENTITY_HEADERS = [
    "x-user-id",
    "x-user-role",
    "x-gateway-secret"
] as const;

export function stripIdentityHeaders(req: Request) {
    for (const header of IDENTITY_HEADERS) {
        delete req.headers[header];
    }
}

function attachGatewaySecret(req: Request) {
    const secret = process.env.GATEWAY_SECRET;
    if (!secret) {
        throw new AppError(500, "GATEWAY_SECRET is not configured");
    }
    req.headers["x-gateway-secret"] = secret;
}

function attachUserHeaders(req: Request, userId: string, role: string) {
    req.headers["x-user-id"] = userId;
    req.headers["x-user-role"] = role;
}

function requestPath(req: Request) {
    const combined = `${req.baseUrl}${req.path}`;
    if (combined.length > 1 && combined.endsWith("/")) {
        return combined.slice(0, -1);
    }
    return combined || "/";
}

export function gatewayAuth(req: Request, _res: Response, next: NextFunction) {
    try {
        stripIdentityHeaders(req);
        attachGatewaySecret(req);

        const path = requestPath(req);

        if (isPublicRoutes(req.method, path)) {
            return next();
        }

        const authHeader = req.header("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            throw new AppError(401, "Missing Bearer token");
        }

        const token = authHeader.slice("Bearer ".length).trim();
        const payload = verifyToken(token);

        const allowedRoles = gatAllowedRoles(req.method, path);
        if (!allowedRoles) {
            throw new AppError(404, "Route not found");
        }

        if (!allowedRoles.includes(payload.role)) {
            throw new AppError(403, "Forbidden: you do not have access to this route");
        }

        attachUserHeaders(req, payload.userId, payload.role);
        return next();
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        return next(new AppError(401, "Invalid or expired token"));
    }
}
