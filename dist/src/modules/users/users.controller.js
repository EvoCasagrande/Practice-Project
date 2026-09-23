import { validarParametro } from "../../utils/validarParametro.js";
import { AppError } from "../../utils/AppError.js";
export class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAll = async (_req, res) => {
        const users = await this.userService.getAll();
        res.status(200).json({
            status: 'success',
            results: users.length,
            users
        });
    };
    getById = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        if (userId === null) {
            throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
        }
        const user = await this.userService.getById(userId);
        if (!user) {
            throw new AppError('No existe usuario con ese id', 404);
        }
        res.status(200).json({
            status: 'success',
            user
        });
    };
    update = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        if (userId === null) {
            throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
        }
        const user = await this.userService.update(userId, req.body);
        res.status(200).json({
            status: 'success',
            user
        });
    };
    delete = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        if (userId === null) {
            throw new AppError('El userId debe ser un entero positivo y menor a 2147483648.', 400);
        }
        await this.userService.delete(userId);
        res.status(204).send();
    };
}
//# sourceMappingURL=users.controller.js.map