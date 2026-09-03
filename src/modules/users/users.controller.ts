import { Request, Response } from "express";
import { UserService} from './users.service'

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
                message: 'Hubo un error en la operación.'
            })
        }
    }

    getById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        try{
            const id = Number(req.params.id);
            const user = this.userService.getById(id);
            
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
                message: 'Hubo un error en la operación.'
            })
        }
    }

    create = async(req: Request, res: Response) => {

    }

    update = async(req: Request, res: Response) => {

    }

    delete = async(req: Request, res: Response) => {

    }
}