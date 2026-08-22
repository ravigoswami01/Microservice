import jwt, { SignOptions } from "jsonwebtoken"
import type { jwtPayload } from "./types"

function exterctjwtScrect(): string {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error("jwt Secret not set")
    }
    return secret
}

export function signToken(paylode: jwtPayload): string {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(paylode, exterctjwtScrect(), {
        expiresIn: expiresIn as SignOptions["expiresIn"]
    })
}


export function verifyToken(token: string): jwtPayload {
    const decodeToken = jwt.verify(token, exterctjwtScrect())

    if (typeof decodeToken !== 'object' || decodeToken === null || typeof decodeToken.userId !== 'string' || (decodeToken.role !== "USER" && decodeToken.role !== "ADMIN")) {
        throw new Error("Inviled token Payloade ")
    }
    return {
        userId: decodeToken.userId,
        role: decodeToken.role
    };


}