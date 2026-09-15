import { validarParametro } from '../../utils/validarParametro.js';
import { AppError } from '../../utils/AppError.js';
export class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    getAll = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        if (userId === null) {
            throw new AppError('El userId debe ser un entero positivo', 400);
        }
        const projects = await this.projectService.getAll(userId);
        res.status(200).json({
            status: 'success',
            results: projects.length,
            projects
        });
    };
    getById = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        if (userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo.', 400);
        }
        const project = await this.projectService.getById(userId, projectId);
        if (!project) {
            throw new AppError('No existe projecto con ese id', 404);
        }
        res.status(200).json({
            status: 'success',
            project
        });
    };
    create = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        if (userId === null) {
            throw new AppError('El userId debe ser un entero positivo.', 400);
        }
        const project = await this.projectService.create(userId, req.body);
        if (!project) {
            throw new AppError('No existe un usuario con ese ID.', 404);
        }
        res.status(201).json({
            status: 'success',
            project
        });
    };
    update = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        if (userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo.', 400);
        }
        const project = await this.projectService.update(userId, projectId, req.body);
        res.status(200).json({
            status: 'success',
            project
        });
    };
    delete = async (req, res) => {
        const userId = validarParametro(req.params.userId);
        const projectId = validarParametro(req.params.projectId);
        if (userId === null || projectId === null) {
            throw new AppError('El userId y projectId deben ser un entero positivo.', 400);
        }
        await this.projectService.delete(userId, projectId);
        res.status(204).send();
    };
}
//# sourceMappingURL=projects.controller.js.map