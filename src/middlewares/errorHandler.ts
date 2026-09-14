import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return
    }
    console.error(err);

    res.status(500).json({
        status: 'error',
        message: 'Ocurrió un fallo general e inesperado dentro del servidor.'
    })
}