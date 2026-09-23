import { AppError } from '../utils/AppError.js';
import { validarParametro } from '../utils/validarParametro.js';
export const autorizarUsuarioOAdmin = (req, res, next) => {
    const role = res.locals.role;
    const idMiddleware = res.locals.userId;
    const idUrl = validarParametro(req.params.userId);
    if (idUrl === null) {
        throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
    }
    if (idUrl === idMiddleware || role === 'ADMIN') {
        return next();
    }
    throw new AppError('Acceso no autorizado', 403);
};
//# sourceMappingURL=autorizarUsuarioOAdmin.js.map