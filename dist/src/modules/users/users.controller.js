import { UserService } from './users.service';
const userService = new UserService();
export class userController {
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
            res.status(404).json({
                status: 'error',
                message: 'Hubo un error en la operación.'
            });
        }
    };
    getById = async (req, res) => {
    };
    create = async (req, res) => {
    };
    update = async (req, res) => {
    };
    delete = async (req, res) => {
    };
}
//# sourceMappingURL=users.controller.js.map