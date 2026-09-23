import { prisma } from "../../lib/prisma.js";
export class ProjectService {
    getAll = async (userId, filters) => {
        const total = await prisma.project.count({
            where: {
                userId,
                name: {
                    contains: filters.search,
                    mode: 'insensitive'
                }
            },
        });
        const projects = await prisma.project.findMany({
            where: {
                userId,
                name: {
                    contains: filters.search,
                    mode: 'insensitive'
                }
            },
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
            orderBy: [{
                    [filters.sortBy]: filters.order,
                }, {
                    id: 'asc'
                }],
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
        const returnObj = {
            projects,
            total
        };
        return returnObj;
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