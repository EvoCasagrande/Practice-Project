export class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    getAll = async (req, res) => {
        try {
            const tasks = await this.taskService.getAll();
            res.status(200).json({
                status: 'success',
                results: tasks.length,
                tasks
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
            const task = await this.taskService.getById(id);
            res.status(200).json({
                status: 'success',
                task
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
            const task = await this.taskService.create(req.body);
            res.status(201).json({
                status: 'success',
                task
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
            const task = await this.taskService.update(id, req.body);
            res.status(200).json({
                status: 'success',
                task
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
            const task = await this.taskService.delete(id);
            res.status(200).json({
                status: 'success',
                task
            });
        }
        catch {
            res.status(500).json({
                status: 'error',
                message: 'Ocurrio un error en la operacion.'
            });
        }
    };
}
//# sourceMappingURL=tasks.controller.js.map