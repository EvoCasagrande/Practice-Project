import { prisma } from '../../lib/prisma.js';
export class UserService {
    getAll = async () => {
        return prisma.user.findMany();
    };
    getById = async (id) => {
        return prisma.user.findUnique({
            where: { id }
        });
    };
    create = async (data) => {
        return prisma.user.create({ data });
    };
    update = async (id, data) => {
        return prisma.user.update({
            where: { id },
            data
        });
    };
    delete = async (id) => {
        return prisma.user.delete({
            where: { id }
        });
    };
}
//# sourceMappingURL=users.service.js.map