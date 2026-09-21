import { TaskService} from "./tasks.service.js"
import type { Request, Response } from 'express'
import type { UserProjectParams } from "../projects/projects.controller.js"
import { validarParametro } from "../../utils/validarParametro.js"
import type { CreateTaskInput, UpdateTaskInput } from "./tasks.schema.js"
import { AppError } from "../../utils/AppError.js"
import { taskQuerySchema } from "./tasks.schema.js"
import { safeParse } from "zod"

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
            throw new AppError('El userId y projectId deben ser un entero positivo y menor a 2147483648.', 400)
        }

        const query = safeParse(taskQuerySchema, req.query);

        if(!query.success) {
            throw new AppError(query.error.issues[0].message, 400)
        }

        const result = await this.taskService.getAll(userId, projectId, query.data);

        if(result === null){
            throw new AppError('No existe un proyecto con ese ID', 404)
        }

        res.status(200).json({
            status: 'success',
            results: result.tasks.length,
            page: query.data.page,
            limit: query.data.limit,
            total: result.total,
            totalPages: Math.ceil(result.total/query.data.limit) ,
            tasks: result.tasks
        })
    }

    getById = async(req: Request<UserProjectTaskParams>, res: Response): Promise<void> => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        const taskId = validarParametro (req.params.taskId);

        if(userId === null || projectId === null || taskId ===null) {
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo y menor a 2147483648.', 400)
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
            throw new AppError('El userId y projectId deben ser un entero positivo y menor a 2147483648.', 400)
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
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo y menor a 2147483648.', 400)
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
            throw new AppError('El userId, projectId y taskId deben ser un entero positivo y menor a 2147483648.', 400)
        }

        const task = await this.taskService.delete(userId, projectId, taskId);

        res.status(200).json({
            status: 'success',
            task
        })
    }
}
