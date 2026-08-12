import { email, z } from "zod"


export const registerSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email("valide email is rewured"),
    password: z.string().min(6, " password min 6 digt is required"),
})



export const loginSchema = z.object({
    email: z.string().email("valide email is rewured"),
    password: z.string().min(6, " password min 6 digt is required"),
})


export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>