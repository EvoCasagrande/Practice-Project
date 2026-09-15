import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { Prisma } from "../../generated/prisma/client.js";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return
    }

    if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
            res.status(404).json({
                status: 'error',
                message: 'No se encontró el recurso solicitado'
            });
            return
        }
    }

    console.error(err);

    res.status(500).json({
        status: 'error',
        message: 'Ocurrió un fallo general e inesperado dentro del servidor.'
    })
}