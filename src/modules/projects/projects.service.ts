import type { ProjectModel as Project, ProjectGetPayload } from "../../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateProjectInput, UpdateProjectInput } from "./projects.schema.js";


type ProjectWithUser = ProjectGetPayload<{
    include: {
        user: {
            select: {
                id: true,
                email: true,
                name: true
            }
        };
    };
}>;

export class ProjectService {
    getAll = async (userId: number): Promise<ProjectWithUser[]> => {
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

    getById = async (userId: number, projectId: number): Promise<ProjectWithUser | null> => {
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

    create = async (userId: number, data: CreateProjectInput): Promise<ProjectWithUser | null> => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            return null
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

    delete = async (userId: number, projectId: number): Promise<Project> => {
        return prisma.project.delete({
            where: { 
                id: projectId, 
                userId 
            },
        });
    };
}
