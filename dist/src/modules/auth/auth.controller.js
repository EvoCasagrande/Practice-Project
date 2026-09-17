export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res) => {
        const user = await this.authService.register(req.body);
        res.status(201).json({
            status: 'success',
            user
        });
    };
    login = async (req, res) => {
        const { user, token } = await this.authService.login(req.body);
        res.status(200).json({
            status: 'success',
            user,
            token
        });
    };
}
//# sourceMappingURL=auth.controller.js.map