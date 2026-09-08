import { prisma } from '../../lib/prisma.js'
import { TaskModel as Task, TaskGetPayload } from '../../../generated/prisma/models.js'

export type CreateTaskInput = {
    title: string;
    completed?: boolean;
    projectId: number;
};

export type UpdateTaskInput = {
    title?: string;
    completed?: boolean;
    projectId?: number;
};

type TaskWithProject = TaskGetPayload<{
    include: {
        project: true
    }
}>;

export class TaskService {
    getAll = async(): Promise<TaskWithProject[]> => {
        return prisma.task.findMany({
            include: {
                project: true
            }
        });
    }

    getById = async(id: number): Promise<TaskWithProject | null> => {
        return prisma.task.findUnique({
            where: { id },
            include: {
                project: true
            }
        });
    }

    create = async(data: CreateTaskInput): Promise<TaskWithProject> => {
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
    }

    update = async(id: number, data: UpdateTaskInput): Promise<TaskWithProject> => {
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
        })
    }

    delete = async(id: number): Promise<Task> => {
        return prisma.task.delete({
            where: { id }
        })
    }
}
