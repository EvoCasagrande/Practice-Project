import { AppError } from '../utils/AppError.js';
export const autorizarAdmin = (req, res, next) => {
    const role = res.locals.role;
    if (role !== 'ADMIN') {
        throw new AppError('Acceso no autorizado', 403);
    }
    next();
};
//# sourceMappingURL=autorizarAdmin.js.map