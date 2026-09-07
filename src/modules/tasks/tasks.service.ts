import { prisma } from '../../lib/prisma.js'
import { TaskModel as Task, TaskGetPayload } from '../../../generated/prisma/models.js'

export type CreateTaskInput = {
    name: string;
    description: string;
    userId: number;
};

export type UpdateTaskInput = {
    name?: string;
    description?: string;
    userId?: number;
};

type ProjectWithUser = TaskGetPayload<{
    include: {
        
    }
}>; 