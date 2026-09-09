import { TaskService, CreateTaskInput, UpdateTaskInput } from "./tasks.service.js"
import { Request, Response } from 'express'

type UserProjectParams = {
    userId: string,
    projectId: string
}

type UserProjectTaskParams = {
    projectId: string,
    taskId: string
}

export class TaskController {
    constructor(private readonly taskService: TaskService){}

    getAll = async(req: Request<UserProjectParams>, res: Response): Promise<void> => {
        try{
            const projectId = Number(req.params.projectId);
            const tasks = await this.taskService.getAll(projectId);

            res.status(200).json({
                status: 'success',
                results: tasks.length,
                tasks
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    getById = async(req: Request<ProjectTaskParams>, res: Response): Promise<void> => {
        try{
            const projectId = Number(req.params.projectId);
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.getById(projectId, taskId)

            if(!task) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe projecto con ese id'
                });
                return
            }

            res.status(200).json({
                status: 'success',
                task
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    create = async(req: Request<ProjectParams, {}, CreateTaskInput>, res: Response): Promise<void> => {
        try{
            const projectId = Number(req.params.projectId);
            const task = await this.taskService.create(projectId, req.body);

            res.status(201).json({
                status: 'success',
                task
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    update = async(req: Request<ProjectTaskParams, {}, UpdateTaskInput>, res: Response): Promise<void> => {
        try{
            const projectId = Number(req.params.projectId);
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.update(projectId, taskId, req.body);

            res.status(200).json({
                status: 'success',
                task
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    delete = async(req: Request<ProjectTaskParams>, res: Response): Promise<void> => {
        try{
            const projectId = Number(req.params.projectId);
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.delete(projectId, taskId);

            res.status(200).json({
                status: 'success',
                task
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }
}
