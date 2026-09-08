import { prisma } from "../../lib/prisma.js";
export class ProjectService {
    getAll = async () => {
        return prisma.project.findMany({
            include: {
                user: true,
            },
        });
    };
    getById = async (id) => {
        return prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    };
    create = async (data) => {
        return prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                userId: data.userId
            },
            include: {
                user: true,
            },
        });
    };
    update = async (id, data) => {
        return prisma.project.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                userId: data.userId
            },
            include: {
                user: true
            },
        });
    };
    delete = async (id) => {
        return prisma.project.delete({
            where: { id },
        });
    };
}
//# sourceMappingURL=projects.service.js.map