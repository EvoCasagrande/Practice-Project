import type { NextFunction, Request, Response } from "express";
import { UserService } from './users.service.js'
import { validarParametro } from "../../utils/validarParametro.js";
import type { CreateUserInput, UpdateUserInput } from "./users.schema.js";
import { AppError } from "../../utils/AppError.js";

export type UserParams = {
    userId: string
}

export class UserController {
    constructor(private readonly userService: UserService){}

    getAll = async(_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const users = await this.userService.getAll();

            res.status(200).json({
                status: 'success',
                results: users.length,
                users
            })
        } catch (err) {
            next(err);
        }
    }

    getById = async(req: Request<UserParams>, res: Response, next: NextFunction): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                throw new AppError('El userId debe ser un entero positivo', 400)
            }

            const user = await this.userService.getById(userId);
            
            if(!user) {
                throw new AppError('No existe usuario con ese id', 404);
            }
            
            res.status(200).json({
                status: 'success',
                user
            })
        } catch (err){
            next(err);
        }
    }

    create = async(req: Request<{},{}, CreateUserInput>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.userService.create(req.body)

            res.status(201).json({
                status: 'success',
                user
            })
        } catch (err) {
            next(err)
        }
    }

    update = async(req: Request<UserParams, {}, UpdateUserInput>, res: Response, next: NextFunction): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                throw new AppError('El userId debe ser un entero positivo', 400)
            }

            const user = await this.userService.update(userId, req.body);

            res.status(200).json({
                status: 'success',
                user
            })
        } catch (err){
            next(err)
        }
    }

    delete = async(req: Request<UserParams>, res: Response, next: NextFunction): Promise<void> => {
        try{
            const userId = validarParametro(req.params.userId);

            if(userId === null) {
                throw new AppError('El userId debe ser un entero positivo', 400)
            }

            await this.userService.delete(userId);

            res.status(204).send();
        } catch (err) {
            next(err)
        }
    }
}
