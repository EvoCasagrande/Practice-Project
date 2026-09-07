import { promiseHooks } from 'node:v8';
import { CreateProjectInput, UpdateProjectInput, ProjectService } from './projects.service.js';
import { Request, Response } from 'express';

export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const projects = await this.projectService.getAll();

            res.status(200).json({
                status: 'success',
                results: projects.length,
                projects
            });
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrió un error en la operación.'
            })
        }
    }

    getById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const project = await this.projectService.getById(id);

            if(!project) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe projecto con ese id'
                });
                return
            }

            res.status(200).json({
                status: 'success',
                project
            });
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrió un error en la operación.'
            })
        }
    }

    create = async(req: Request<{}, {}, CreateProjectInput>, res: Response): Promise<void>
}