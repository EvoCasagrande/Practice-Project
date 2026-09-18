import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { Prisma } from "../../generated/prisma/client.js";

export const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction): void => {
    if(res.headersSent) {
        return next(err);
    }

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
                message: 'No se encontro el recurso solicitado'
            });
            return
        }
        if(err.code === 'P2002') {  
            res.status(409).json({
                status: 'error',
                message: "Ya existe una cuenta con este email"
            });
            return
        }
        if(err.code === 'P2003') {  
            res.status(409).json({
                status: 'error',
                message: "No se puede completar la operación porque existe una relación inválida"
            });
            return
        }
        if(err.code === 'P2024') {  
            console.error(err);
            res.status(503).json({
                status: 'error',
                message: "El servicio de base de datos no está disponible temporalmente"
            });
            return
        }
    }

    if(err instanceof Prisma.PrismaClientInitializationError) {
        console.error(err)
        res.status(503).json({
            status: 'error',
            message: 'El servicio de base de datos no está disponible temporalmente'
        })
        return
    }

    console.error(err);

    res.status(500).json({
        status: 'error',
        message: 'Ocurrio un fallo general e inesperado dentro del servidor.'
    })
}