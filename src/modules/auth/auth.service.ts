import type { LoginInput, RegisterInput } from "./auth.schema.js"
import bcrypt from 'bcrypt';
import { prisma } from "../../lib/prisma.js";
import type { User } from "../../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";
import  jwt  from "jsonwebtoken";
import { jwtSecret } from "../../config/env.js";

type AuthResult = {
    user: PublicUser,
    token: string
}

type PublicUser = Pick<User, 'id' | 'email' | 'name'>



export class AuthService {
    register = async (data: RegisterInput): Promise<PublicUser> => {
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
        })
    }

    login = async (data: LoginInput): Promise<AuthResult> => {
        const user = await prisma.user.findUnique({
            where: { 
                email: data.email
            }
        });

        if(!user) {
            throw new AppError('Email o contraseña incorrectos', 401);
        }

        const passwordIsValid = await bcrypt.compare(data.password, user.passwordHash)

        if(!passwordIsValid) {
            throw new AppError('Email o contraseña incorrectos', 401)
        }

        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const userId = {
            id: user.id
        }

        const token = jwt.sign(userId, jwtSecret, {
            expiresIn: '30'
        })

        const authUser = {
            user: publicUser,
            token
        }

        return authUser
    }
}