import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const autorizarAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.role;

    if(role !== 'ADMIN') {
        throw new AppError('Acceso no autorizado', 403);
    }

    next();
}