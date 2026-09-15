import { TaskService} from "./tasks.service.js"
import type { Request, Response } from 'express'
import type { UserProjectParams } from "../projects/projects.controller.js"
import { validarParametro } from "../../utils/validarParametro.js"
import type { CreateTaskInput, UpdateTaskInput } from "./tasks.schema.js"
import { AppError } from "../../utils/AppError.js"

type UserProjectTaskParams = {
    userId: string,
    projectId: string,
    taskId: string
}

export class TaskController {
    constructor(private readonly taskService: TaskService){}

    getAll = async(req: Request<UserProjectParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);

        if(userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo.', 400)
        }

        const tasks = await this.taskService.getAll(userId, projectId);

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            tasks
        })
    }

    getById = async(req: Request<UserProjectTaskParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        const taskId = validarParametro (req.params.taskId);

        if(userId === null || projectId === null || taskId ===null) {
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo.', 400)
        }
            
        const task = await this.taskService.getById(userId, projectId, taskId);

        if(!task) {
            throw new AppError('No existe tarea con ese id', 404)
        }

        res.status(200).json({
            status: 'success',
            task
        })
    }

    create = async(req: Request<UserProjectParams, {}, CreateTaskInput>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);

        if(userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo.', 400)
        }

        const task = await this.taskService.create(userId, projectId, req.body);

        if(!task) {
            throw new AppError('No existe un usuario o projecto con ese ID.', 404)
        }


        res.status(201).json({
            status: 'success',
            task
        })
    }

    update = async(req: Request<UserProjectTaskParams, {}, UpdateTaskInput>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        const taskId = validarParametro (req.params.taskId);

        if(userId === null || projectId === null || taskId ===null) {
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo.', 400)
        }

        const task = await this.taskService.update(userId, projectId, taskId, req.body);

        res.status(200).json({
            status: 'success',
            task
        })
    }

    delete = async(req: Request<UserProjectTaskParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        const taskId = validarParametro (req.params.taskId);

        if(userId === null || projectId === null || taskId ===null) {
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo.', 400)
        }

        const task = await this.taskService.delete(userId, projectId, taskId);

        res.status(200).json({
            status: 'success',
            task
        })
    }
}
