import type { ProjectModel as Project, ProjectGetPayload } from "../../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateProjectInput, ProjectQueryInput, UpdateProjectInput } from "./projects.schema.js";

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

type ProjectListResult = {
    projects: ProjectWithUser[],
    total: number
}

export class ProjectService {
    getAll = async (userId: number, filters: ProjectQueryInput): Promise<ProjectListResult> => {
        const total = await prisma.project.count({
            where: { 
                userId,
                name: {
                    contains: filters.search,
                    mode: 'insensitive'
                }
            },
        })
        
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
            orderBy: {
                id: 'asc'
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

        const returnObj = {
            projects,
            total
        }

        return returnObj
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
