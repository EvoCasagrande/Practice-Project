export class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    getAll = async (req, res) => {
        try {
            const projects = await this.projectService.getAll();
            res.status(200).json({
                status: 'success',
                results: projects.length,
                projects
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'OcurriÃ³ un error en la operaciÃ³n.'
            });
        }
    };
    getById = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const project = await this.projectService.getById(id);
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
                message: 'OcurriÃ³ un error en la operaciÃ³n.'
            });
        }
    };
    create = async (req, res) => {
        try {
            const project = await this.projectService.create(req.body);
            res.status(201).json({
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
    update = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const project = await this.projectService.update(id, req.body);
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
            const id = Number(req.params.id);
            await this.projectService.delete(id);
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