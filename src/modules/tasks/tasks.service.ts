import { prisma } from '../../lib/prisma.js'
import type { TaskModel as Task, TaskGetPayload } from '../../../generated/prisma/models.js'
import type { CreateTaskInput, UpdateTaskInput } from './tasks.schema.js';
import type { TaskQueryInput } from './tasks.schema.js';

type TaskWithProject = TaskGetPayload<{
    include: {
        project: true
    }
}>;

type TaskListResult = {
    tasks: TaskWithProject[],
    total: number
}

export class TaskService {
    getAll = async(userId: number, projectId: number, filters: TaskQueryInput): Promise<TaskListResult | null> => {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId,
            }
        })

        if(!project) {
            return null
        }

        const total = await prisma.task.count({
            where: { 
                projectId,
                project: {
                    userId
                },
                completed: filters.completed,
                title: {
                    contains: filters.search,
                    mode: 'insensitive'
                }
            },
        })

        const tasks = await prisma.task.findMany({
            where: { 
                projectId,
                project: {
                    userId
                },
                completed: filters.completed,
                title: {
                    contains: filters.search,
                    mode: 'insensitive'
                }
            },
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
            orderBy: [{
                [filters.sortBy]: filters.order,
            },{
                id: 'asc'
            }],
            include: {
                project: true
            }
        });

        const returnObj = {
            tasks,
            total
        }

        return returnObj
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
