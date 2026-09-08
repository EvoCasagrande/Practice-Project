import { TaskService, CreateTaskInput, UpdateTaskInput } from "./tasks.service.js"
import { Request, Response } from 'express'

export class TaskController {
    constructor(private readonly taskService: TaskService){}

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const tasks = await this.taskService.getAll()

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

    getById = async(req: Request<{ taskId: string }>, res: Response): Promise<void> => {
        try{
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.getById(taskId)

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

    create = async(req: Request<{}, {}, CreateTaskInput>, res: Response): Promise<void> => {
        try{
            const task = await this.taskService.create(req.body)

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

    update = async(req: Request<{ taskId: string }, {}, UpdateTaskInput>, res: Response): Promise<void> => {
        try{
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.update(taskId, req.body);

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

    delete = async(req: Request<{ taskId: string }>, res: Response): Promise<void> => {
        try{
            const taskId = Number(req.params.taskId);
            const task = await this.taskService.delete(taskId);

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
