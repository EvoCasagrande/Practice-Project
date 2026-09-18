import { prisma } from "../../lib/prisma.js";
export class ProjectService {
    getAll = async (userId) => {
        return prisma.project.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                },
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
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
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
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                },
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
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
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