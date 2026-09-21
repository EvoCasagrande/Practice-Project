import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { validarParametro } from '../utils/validarParametro.js';

type UserId = {
    userId: string
}

export const autorizarUsuarioOAdmin = (req: Request<UserId>, res: Response, next: NextFunction) => {
    const role = res.locals.role
    const idMiddleware = res.locals.userId
    const idUrl = validarParametro(req.params.userId);

    if(idUrl === null) {
        throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400)
    }

    if(idUrl === idMiddleware || role === 'ADMIN') {
        return next()
    }

    throw new AppError('Acceso no autorizado', 403)
}