import type { ProjectModel as Project, ProjectGetPayload } from "../../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";

export type CreateProjectInput = {
    name: string;
    description: string;
};

export type UpdateProjectInput = {
    name?: string;
    description?: string;
};

type ProjectWithUser = ProjectGetPayload<{
    include: {
        user: true;
    };
}>;

export class ProjectService {
    getAll = async (userId: number): Promise<ProjectWithUser[]> => {
        return prisma.project.findMany({
            where: { userId },
            include: {
                user: true,
            },
        });
    };

    getById = async (userId: number, projectId: number): Promise<ProjectWithUser | null> => {
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

    create = async (userId: number, data: CreateProjectInput): Promise<ProjectWithUser> => {
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

    update = async (userId: number, projectId: number, data: UpdateProjectInput): Promise<ProjectWithUser> => {
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

    delete = async (userId: number, projectId: number): Promise<Project> => {
        return prisma.project.delete({
            where: { 
                id: projectId, 
                userId 
            },
        });
    };
}
