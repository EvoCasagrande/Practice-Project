import { prisma } from '../../lib/prisma.js';
export class TaskService {
    getAll = async (userId, projectId) => {
        return prisma.task.findMany({
            where: {
                projectId,
                project: {
                    userId
                }
            },
            include: {
                project: true
            }
        });
    };
    getById = async (userId, projectId, taskId) => {
        return prisma.task.findUnique({
            where: {
                projectId,
                id: taskId,
                project: {
                    userId
                }
            },
            include: {
                project: true
            }
        });
    };
    create = async (userId, projectId, data) => {
        const project = await prisma.project.findUnique({
            where: {
                userId, id: projectId
            }
        });
        if (!project) {
            return null;
        }
        return prisma.task.create({
            data: {
                title: data.title,
                completed: data.completed,
                projectId
            },
            include: {
                project: true
            }
        });
    };
    update = async (userId, projectId, taskId, data) => {
        return prisma.task.update({
            where: {
                projectId,
                id: taskId,
                project: {
                    userId
                }
            },
            data: {
                title: data.title,
                completed: data.completed,
            },
            include: {
                project: true
            }
        });
    };
    delete = async (userId, projectId, taskId) => {
        return prisma.task.delete({
            where: {
                projectId,
                id: taskId,
                project: {
                    userId
                }
            }
        });
    };
}
//# sourceMappingURL=tasks.service.js.map