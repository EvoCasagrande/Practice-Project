import { validarParametro } from "../utils/validarParametro.js";
import { AppError } from "../utils/AppError.js";
export const autorizarUsuario = (req, res, next) => {
    const id = req.params.userId;
    const idValido = validarParametro(id);
    if (idValido === null) {
        throw new AppError('El userId debe ser un entero positivo', 400);
    }
    if (idValido !== res.locals.userId) {
        throw new AppError('Acceso no autorizado', 403);
    }
    next();
};
//# sourceMappingURL=autorizarUsuario.js.map