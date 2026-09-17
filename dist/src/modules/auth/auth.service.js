import bcrypt from 'bcrypt';
import { prisma } from "../../lib/prisma.js";
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
    };
}
//# sourceMappingURL=auth.service.js.map