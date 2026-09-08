import { prisma } from '../../lib/prisma.js';
export class TaskService {
    getAll = async () => {
        return prisma.task.findMany({
            include: {
                project: true
            }
        });
    };
    getById = async (id) => {
        return prisma.task.findUnique({
            where: { id },
            include: {
                project: true
            }
        });
    };
    create = async (data) => {
        return prisma.task.create({
            data: {
                title: data.title,
                completed: data.completed,
                projectId: data.projectId,
            },
            include: {
                project: true
            }
        });
    };
    update = async (id, data) => {
        return prisma.task.update({
            where: { id },
            data: {
                title: data.title,
                completed: data.completed,
                projectId: data.projectId,
            },
            include: {
                project: true
            }
        });
    };
    delete = async (id) => {
        return prisma.task.delete({
            where: { id }
        });
    };
}
//# sourceMappingURL=tasks.service.js.map