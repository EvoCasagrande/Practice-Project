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
    login = async () => {
    };
}
//# sourceMappingURL=auth.controller.js.map