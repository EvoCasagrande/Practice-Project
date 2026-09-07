import type { ProjectModel as Project, ProjectGetPayload } from "../../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";

export type CreateProjectInput = {
    name: string;
    description: string;
    userId: number;
};

export type UpdateProjectInput = {
    name?: string;
    description?: string;
    userId?: number;
};

type ProjectWithUser = ProjectGetPayload<{
    include: {
        user: true;
    };
}>;

export class ProjectService {
    getAll = async (): Promise<ProjectWithUser[]> => {
        return prisma.project.findMany({
            include: {
                user: true,
            },
        });
    };

    getById = async (id: number): Promise<ProjectWithUser | null> => {
        return prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    };

    create = async (data: CreateProjectInput): Promise<ProjectWithUser> => {
        return prisma.project.create({
            data: {
            name: data.name,
            description: data.description,
            user: {
                connect: {
                id: data.userId,
                },
            },
        },

        include: {
            user: true,
            },
        });
    };

    update = async (id: number, data: UpdateProjectInput): Promise<ProjectWithUser> => {
        return prisma.project.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                user:
                    data.userId !== undefined
                    ? {
                    connect: {
                        id: data.userId,
                        },
                    }: undefined,
            },
            include: { user: true },
        });
    };

    delete = async (id: number) => {
        return prisma.project.delete({
            where: { id },
        });
    };
}
