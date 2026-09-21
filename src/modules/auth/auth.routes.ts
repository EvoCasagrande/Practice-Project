import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { validarBody } from "../../middlewares/validarBody.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerLimiter, loginLimiter } from "../../middlewares/authRateLimit.js";

const authService = new AuthService();
const authController = new AuthController(authService);


const router = Router();

router.post(
    '/register',
    registerLimiter,
    validarBody(registerSchema),
    authController.register
);

router.post(
    '/login',
    loginLimiter,
    validarBody(loginSchema),
    authController.login
)

export default router;
