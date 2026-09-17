import { prisma } from '../../lib/prisma.js';
export class UserService {
    getAll = async () => {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    };
    getById = async (id) => {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    };
    update = async (id, data) => {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    };
    delete = async (id) => {
        return prisma.user.delete({
            where: { id }
        });
    };
}
//# sourceMappingURL=users.service.js.map