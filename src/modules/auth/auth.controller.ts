import type { RegisterInput, LoginInput } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from 'express';

export class AuthController {
    constructor(private readonly authService: AuthService){}

    register = async (req: Request<{}, {}, RegisterInput>, res: Response): Promise<void> => {
        const user = await this.authService.register(req.body);

        res.status(201).json({
            status: 'success',
            user
        })
    }

    login = async (req: Request<{}, {}, LoginInput>, res: Response): Promise<void> => {
        const { user, token } = await this.authService.login(req.body)

        res.status(200).json({
            status: 'success',
            user,
            token
        })
    }
}