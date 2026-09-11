import { validarParametro } from '../../utils/validarParametro.js';
export class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    getAll = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            if (userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo'
                });
                return;
            }
            const projects = await this.projectService.getAll(userId);
            res.status(200).json({
                status: 'success',
                results: projects.length,
                projects
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrió un error en la operación.'
            });
        }
    };
    getById = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);
            if (userId === null || projectId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId y projectId deben ser un entero positivo.'
                });
                return;
            }
            const project = await this.projectService.getById(userId, projectId);
            if (!project) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe projecto con ese id'
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                project
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrió un error en la operación.'
            });
        }
    };
    create = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            if (userId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId debe ser un entero positivo.'
                });
                return;
            }
            const project = await this.projectService.create(userId, req.body);
            if (!project) {
                res.status(404).json({
                    status: 'error',
                    message: 'No existe un usuario con ese ID.',
                });
                return;
            }
            res.status(201).json({
                status: 'success',
                project
            });
        }
        catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
    update = async (req, res) => {
        try {
            const userId = validarParametro(req.params.userId);
            const projectId = validarParametro(req.params.projectId);
            if (userId === null || projectId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId y projectId deben ser un entero positivo.'
                });
                return;
            }
            const project = await this.projectService.update(userId, projectId, req.body);
            res.status(200).json({
                status: 'success',
                project
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
            const projectId = validarParametro(req.params.projectId);
            if (userId === null || projectId === null) {
                res.status(400).json({
                    status: 'error',
                    message: 'El userId y projectId deben ser un entero positivo.'
                });
                return;
            }
            await this.projectService.delete(userId, projectId);
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
//# sourceMappingURL=projects.controller.js.map