import type { CreateProjectInput, UpdateProjectInput, ProjectService } from './projects.service.js';
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

    getById = async(req: Request<{ projectId: string }>, res: Response): Promise<void> => {
        try {
            const projectId = Number(req.params.projectId);
            const project = await this.projectService.getById(projectId);

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

    create = async(req: Request<{}, {}, CreateProjectInput>, res: Response): Promise<void> => {
        try {
            const project = await this.projectService.create(req.body);

            res.status(201).json({
                status: 'success',
                project
            });
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    }

    update = async(req: Request<{ projectId: string }, {}, UpdateProjectInput>, res: Response): Promise<void> => {
        try {
            const projectId = Number(req.params.projectId);
            const project = await this.projectService.update(projectId, req.body);

            res.status(200).json({
                status: 'success',
                project
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    delete = async(req: Request<{ projectId: string }>, res: Response): Promise<void> => {
        try {
            const projectId = Number(req.params.projectId);
            await this.projectService.delete(projectId);

            res.status(204).send();
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }
}
