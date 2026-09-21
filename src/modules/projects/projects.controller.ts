import type { ProjectService } from './projects.service.js';
import type { Request, Response } from 'express';
import { validarParametro } from '../../utils/validarParametro.js';
import type { UserParams } from "../users/users.controller.js";
import type { UpdateProjectInput, CreateProjectInput } from './projects.schema.js';
import { AppError } from '../../utils/AppError.js';
import { projectQuerySchema } from './projects.schema.js';
import { safeParse } from 'zod';

export type UserProjectParams = {
    userId: string,
    projectId: string
}

export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    getAll = async(req: Request<UserParams>, res: Response): Promise<void> => {            
        const userId = validarParametro(req.params.userId);
            
        if(userId === null) {
            throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
        }

        const query = safeParse(projectQuerySchema, req.query);

        if(!query.success) {
            throw new AppError(query.error.issues[0].message, 400)
        }

        const result = await this.projectService.getAll(userId, query.data);

        res.status(200).json({
            status: 'success',
            results: result.projects.length,
            page: query.data.page,
            limit: query.data.limit,
            total: result.total,
            totalPages: Math.ceil(result.total/query.data.limit) ,
            projects: result.projects
        });
    }

    getById = async(req: Request<UserProjectParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);

        if(userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo y menor a 2147483648.', 400);
        }

        const project = await this.projectService.getById(userId, projectId);

        if(!project) {
            throw new AppError('No existe projecto con ese id', 404);
        }

        res.status(200).json({
            status: 'success',
            project
        });
    }

    create = async(req: Request<UserParams, {}, CreateProjectInput>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);

        if(userId === null) {
            throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
        }

        const project = await this.projectService.create(userId, req.body);

        if(!project) {
            throw new AppError('No existe un usuario con ese ID.', 404);
        }

        res.status(201).json({
            status: 'success',
            project
        });
    }

    update = async(req: Request<UserProjectParams, {}, UpdateProjectInput>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);

        if(userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo y menor a 2147483648.', 400);
        }

        const project = await this.projectService.update(userId, projectId, req.body);

        res.status(200).json({
            status: 'success',
            project
        })
    }

    delete = async(req: Request<UserProjectParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);

        if(userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo y menor a 2147483648.', 400);
        }

        await this.projectService.delete(userId, projectId);

        res.status(204).send();
    }
}
