import { Request, Response } from "express";
import { UserService} from './users.service'
import { type  CreateUserInput, type UpdateUserInput} from './users.service'

export class UserController {
    constructor(private readonly userService: UserService){}

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const users = await this.userService.getAll();

            res.status(200).json({
                status: 'success',
                results: users.length,
                users
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Hubo un error en la operacion.'
            })
        }
    }

    getById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        try{
            const id = Number(req.params.id);
            const user = await this.userService.getById(id);
            
            if(!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe usuario con ese id'
                });
                return
            }
            
            res.status(200).json({
                status: 'success',
                user
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Hubo un error en la operacion.'
            })
        }
    }

    create = async(req: Request<{},{}, CreateUserInput>, res: Response): Promise<void> => {
        try {
            const user = await this.userService.create(req.body)

            res.status(201).json({
                status: 'success',
                user
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    update = async(req: Request<{ id: string }, {}, UpdateUserInput>, res: Response): Promise<void> => {
        try{
            const id = Number(req.params.id);
            const user = await this.userService.update(id, req.body);

            res.status(200).json({
                status: 'success',
                user
            })
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    delete = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        try{
            const id = Number(req.params.id);
            await this.userService.delete(id);

            res.status(204).send();
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }
}