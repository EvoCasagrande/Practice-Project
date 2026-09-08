import { Router } from 'express';
import { TaskController } from './tasks.controller.js';
import { TaskService } from './tasks.service.js';
const taskService = new TaskService();
const taskController = new TaskController(taskService);
const router = Router({ mergeParams: true });
router.
    route('/').
    get(taskController.getAll).
    post(taskController.create);
router.
    route('/:taskId').
    get(taskController.getById).
    patch(taskController.update).
    delete(taskController.delete);
export default router;
//# sourceMappingURL=tasks.routes.js.map