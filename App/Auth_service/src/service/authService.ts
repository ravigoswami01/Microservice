import { AppError } from "shared";
import { findByEmail, createUser } from "../repostories/user.repo";
import { LoginInput, RegisterInput } from "../schema/auth.schema";
import bcrypt from "bcryptjs";
import { convertedToPublicUser } from "../utils/auth.utils";
import { signToken } from "../utils/jwt";

export async function register(input: RegisterInput) {
    const existing = await findByEmail(input.email)

    if (existing) {
        throw new AppError(409, "Email already registered")
    }

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await createUser({
        name: input.name,
        email: input.email,
        passwordHash,
        role: "USER"
    })

    return convertedToPublicUser(user)
}


export async function login(input: LoginInput) {
    const user = await findByEmail(input.email)
    if (!user) {
        throw new AppError(401, "invalid emale or password")
    }

    const valid = await bcrypt.compare(input.password, user.password_hash)

    if (!valid) {
        throw new AppError(401, "Inviled Email or Password")
    }

    const token = signToken({ userId: user.id, role: user.role })

    return {
        token,
        user: convertedToPublicUser(user)
    }
}