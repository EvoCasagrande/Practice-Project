import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validarBody = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const resultado = schema.safeParse(req.body)

        if(!resultado.success) {
            res.status(400).json({
                status: 'error',
                message: 'Datos invalidos',
                errors: resultado.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                })),
            })
            return
        }
        req.body = resultado.data;
        next()
    }
}