import { prisma } from '../../lib/prisma.js'
import type { TaskModel as Task, TaskGetPayload } from '../../../generated/prisma/models.js'
import type { CreateTaskInput, UpdateTaskInput } from './tasks.schema.js';

type TaskWithProject = TaskGetPayload<{
    include: {
        project: true
    }
}>;

export class TaskService {
    getAll = async(userId: number, projectId: number): Promise<TaskWithProject[]> => {
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
    }

    getById = async(userId: number, projectId: number, taskId: number): Promise<TaskWithProject | null> => {
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
    }

    create = async(userId:number, projectId: number, data: CreateTaskInput): Promise<TaskWithProject | null> => {
        const project = await prisma.project.findUnique({
            where: {
                userId, id: projectId
            }
        });

        if(!project) {
            return null 
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
    }

    update = async(userId: number, projectId: number, taskId: number, data: UpdateTaskInput): Promise<TaskWithProject> => {
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
        })
    }

    delete = async(userId: number, projectId: number, taskId: number): Promise<Task> => {
        return prisma.task.delete({
            where: { 
                projectId,
                id: taskId,
                project: {
                    userId
                }
            }
        })
    }
}
