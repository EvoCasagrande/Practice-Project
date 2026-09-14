import { AppError } from "../utils/AppError.js";
export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return;
    }
    res.status(500).json({
        status: 'error',
        message: 'Ocurrió un fallo general e inesperado dentro del servidor.'
    });
};
//# sourceMappingURL=errorHandler.js.map