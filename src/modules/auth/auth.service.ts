import type { LoginInput, RegisterInput } from "./auth.schema.js"
import bcrypt from 'bcrypt';
import { prisma } from "../../lib/prisma.js";
import type { User } from "../../../generated/prisma/client.js";
import { AppError } from "../../utils/AppError.js";


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

    login = async (data: LoginInput) => {
        const user = await prisma.user.findUnique({
            where: { 
                email: data.email
            }
        });

        if(!user) {
            if(!user) {
                throw new AppError('Email o contraseña incorrectos', 401);
            }
        }


    }
}