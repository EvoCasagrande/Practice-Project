import bcrypt from 'bcrypt';
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
const getJwtSecret = () => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no esta definida');
    }
    return jwtSecret;
};
const jwtSecret = getJwtSecret();
export class AuthService {
    register = async (data) => {
        const passwordHash = await bcrypt.hash(data.password, 12);
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    };
    login = async (data) => {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) {
            throw new AppError('Email o contraseña incorrectos', 401);
        }
        const passwordIsValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!passwordIsValid) {
            throw new AppError('Email o contraseña incorrectos', 401);
        }
        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        const userId = {
            id: user.id
        };
        const token = jwt.sign(userId, jwtSecret, {
            expiresIn: '1d'
        });
        const authUser = {
            user: publicUser,
            token
        };
        return authUser;
    };
}
//# sourceMappingURL=auth.service.js.map