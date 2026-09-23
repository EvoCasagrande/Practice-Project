import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../lib/prisma.js";
export const autenticarUsuario = async (req, res, next) => {
    const encabezado = req.headers.authorization;
    const tieneBearer = encabezado?.startsWith('Bearer ');
    if (!tieneBearer) {
        throw new AppError('Acceso no autorizado', 401);
    }
    const token = encabezado?.slice(7).trim();
    if (!token) {
        throw new AppError('Acceso no autorizado', 401);
    }
    let payload;
    try {
        payload = jwt.verify(token, jwtSecret);
    }
    catch {
        throw new AppError('Acceso no autorizado', 401);
    }
    if (typeof payload === 'string' || !(typeof payload.id === 'number')) {
        throw new AppError('Acceso no autorizado', 401);
    }
    const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: {
            id: true,
            role: true
        }
    });
    if (!user) {
        throw new AppError('Acceso no autorizado', 401);
    }
    res.locals.role = user.role;
    res.locals.userId = user.id;
    next();
};
//# sourceMappingURL=autenticarUsuario.js.map