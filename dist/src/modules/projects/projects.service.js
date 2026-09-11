import { prisma } from "../../lib/prisma.js";
export class ProjectService {
    getAll = async (userId) => {
        return prisma.project.findMany({
            where: { userId },
            include: {
                user: true,
            },
        });
    };
    getById = async (userId, projectId) => {
        return prisma.project.findUnique({
            where: {
                id: projectId,
                userId
            },
            include: {
                user: true,
            },
        });
    };
    create = async (userId, data) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return null;
        }
        return prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                userId
            },
            include: {
                user: true,
            },
        });
    };
    update = async (userId, projectId, data) => {
        return prisma.project.update({
            where: {
                id: projectId,
                userId
            },
            data: {
                name: data.name,
                description: data.description,
            },
            include: {
                user: true
            },
        });
    };
    delete = async (userId, projectId) => {
        return prisma.project.delete({
            where: {
                id: projectId,
                userId
            },
        });
    };
}
//# sourceMappingURL=projects.service.js.map