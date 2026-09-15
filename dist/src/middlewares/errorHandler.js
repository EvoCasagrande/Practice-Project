import { AppError } from "../utils/AppError.js";
import { Prisma } from "../../generated/prisma/client.js";
export const errorHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return;
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            res.status(404).json({
                status: 'error',
                message: 'No se encontro el recurso solicitado'
            });
            return;
        }
        if (err.code === 'P2002') {
            res.status(409).json({
                status: 'error',
                message: "Ya existe una cuenta con este email"
            });
            return;
        }
    }
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Ocurrio un fallo general e inesperado dentro del servidor.'
    });
};
//# sourceMappingURL=errorHandler.js.map