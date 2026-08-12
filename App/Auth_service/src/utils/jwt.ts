
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtPaylode } from "../types/auth.types";

function exterctjwtScrect(): string {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error("jwt Secret not set")
    }
    return secret
}


export function signToken(paylode: jwtPaylode): string {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(paylode, exterctjwtScrect(), {
        expiresIn: expiresIn as SignOptions["expiresIn"]
    })
}