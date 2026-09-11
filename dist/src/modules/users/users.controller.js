import { validarParametro } from "../../utils/validarParametro.js";
export class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAll = async (_req, res) => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json({
                status: 'success',
                results: users.length,
                users
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
    getById = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            if (userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return;
            }
            const user = await this.userService.getById(userId);
            if (!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe usuario con ese id'
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                user
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
    create = async (req, res) => {
        try {
            const user = await this.userService.create(req.body);
            if (!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe un usuario con ese ID.',
                });
                return;
            }
            res.status(201).json({
                status: 'success',
                user
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
    update = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            if (userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return;
            }
            const user = await this.userService.update(userId, req.body);
            res.status(200).json({
                status: 'success',
                user
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
    delete = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            if (userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return;
            }
            await this.userService.delete(userId);
            res.status(204).send();
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
}
//# sourceMappingURL=users.controller.js.map