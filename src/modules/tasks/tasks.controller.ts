import { TaskService} from "./tasks.service.js"
import type { Request, Response } from 'express'
import type { UserProjectParams } from "../projects/projects.controller.js"
import { validarParametro } from "../../utils/validarParametro.js"
import type { CreateTaskInput, UpdateTaskInput } from "./tasks.schema.js"

type UserProjectTaskParams = {
    userId: string,
    projectId: string,
    taskId: string
}

export class TaskController {
    constructor(private readonly taskService: TaskService){}

    getAll = async(req: Request<UserProjectParams>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);

            if(userId === null || projectId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId y projectId deben ser un entero positivo.'
                });
                return
            }

            const tasks = await this.taskService.getAll(userId, projectId);

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

    getById = async(req: Request<UserProjectTaskParams>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);
            const taskId = validarParametro (req.params.taskId);

            if(userId === null || projectId === null || taskId ===null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId, projectId y taskId deben ser un entero positivo.'
                });
                return
            }
            
            const task = await this.taskService.getById(userId, projectId, taskId);

            if(!task) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe tarea con ese id'
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

    create = async(req: Request<UserProjectParams, {}, CreateTaskInput>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);

            if(userId === null || projectId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId y projectId deben ser un entero positivo.'
                });
                return
            }

            const task = await this.taskService.create(userId, projectId, req.body);

            if(!task) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe un usuario con ese ID.',
                });
                return;
            }


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

    update = async(req: Request<UserProjectTaskParams, {}, UpdateTaskInput>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);
            const taskId = validarParametro (req.params.taskId);

            if(userId === null || projectId === null || taskId ===null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId, projectId y taskId deben ser un entero positivo.'
                });
                return
            }

            const task = await this.taskService.update(userId, projectId, taskId, req.body);

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

    delete = async(req: Request<UserProjectTaskParams>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);
            const taskId = validarParametro (req.params.taskId);

            if(userId === null || projectId === null || taskId ===null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId, projectId y taskId deben ser un entero positivo.'
                });
                return
            }

            const task = await this.taskService.delete(userId, projectId, taskId);

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
