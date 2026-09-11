import type { Request, Response } from "express";
import { UserService } from './users.service.js'
import { validarParametro } from "../../utils/validarParametro.js";
import type { CreateUserInput, UpdateUserInput } from "./users.schema.js";

export type UserParams = {
    userId: string
}

export class UserController {
    constructor(private readonly userService: UserService){}

    getAll = async(_req: Request, res: Response): Promise<void> => {
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
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    getById = async(req: Request<UserParams>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return
            }

            const user = await this.userService.getById(userId);
            
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
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }

    create = async(req: Request<{},{}, CreateUserInput>, res: Response): Promise<void> => {
        try {
            const user = await this.userService.create(req.body)

            if(!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe un usuario con ese ID.',
                });
                return;
            }


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

    update = async(req: Request<UserParams, {}, UpdateUserInput>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return
            }

            const user = await this.userService.update(userId, req.body);

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

    delete = async(req: Request<UserParams>, res: Response): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return
            }

            await this.userService.delete(userId);

            res.status(204).send();
        } catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            })
        }
    }
}
