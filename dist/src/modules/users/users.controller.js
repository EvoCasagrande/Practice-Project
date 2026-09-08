export class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAll = async (req, res) => {
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
            const id = Number(req.params.id);
            const user = await this.userService.getById(id);
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
            const id = Number(req.params.id);
            const user = await this.userService.update(id, req.body);
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
            const id = Number(req.params.id);
            await this.userService.delete(id);
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