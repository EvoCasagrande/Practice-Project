import type { RegisterInput } from "./auth.schema.js";
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

    login = async () => {

    }
}