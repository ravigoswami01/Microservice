import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/authService"
import { successResponse } from "shared";

export async function Register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await authService.register(req.body)
        successResponse(res, { user }, 200)
    } catch (error) {
        next(error)
    }
}


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.login(req.body)
        successResponse(res, result)
    } catch (error) {
        next(error)
    }
}