import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const autenticarUsuario = (req: Request, res: Response, next: NextFunction ) => {
    const encabezado = req.headers.authorization;
    const tieneBearer = encabezado?.startsWith('Bearer ')

    if(!tieneBearer) {
        throw new AppError('Acceso no autorizado', 401);
    }

    const token = encabezado?.slice(7).trim();
    
    if(!token){
        throw new AppError('Acceso no autorizado', 401);
    }

    let payload: string | JwtPayload

    try {
        payload = jwt.verify(token, jwtSecret)
    } catch {

        throw new AppError('Acceso no autorizado', 401)
    }

    if(typeof payload === 'string' || !(typeof payload.id === 'number')) {
        throw new AppError('Acceso no autorizado', 401);
    }

    res.locals.userId = payload.id;
    
    next()
}