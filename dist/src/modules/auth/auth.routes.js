import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { validarBody } from "../../middlewares/validarBody.js";
import { registerSchema } from "./auth.schema.js";
const authService = new AuthService();
const authController = new AuthController(authService);
const router = Router();
router.post('/register', validarBody(registerSchema), authController.register);
//router.post(
//    '/login',
//    validarBody(loginSchema),
//    authController.login
//)
export default router;
//# sourceMappingURL=auth.routes.js.map