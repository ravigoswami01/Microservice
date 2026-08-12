import { Router } from "express";
import { validateBody } from "shared";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import * as authControllers from "../controllers/auth.controllers"


const router = Router()

router.post("/register", validateBody(registerSchema), authControllers.Register)
router.post("/login", validateBody(loginSchema), authControllers.login)



export default router;
