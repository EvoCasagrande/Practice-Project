import { Router } from "express";
import { ProjectService } from "./projects.service.js";
import { ProjectController } from "./projects.controller.js";

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

const router = Router();

router.
    route('/').
    get(projectController.getAll).
    post(projectController.create);

router.
    route('/:projectId').
    get(projectController.getById).
    patch(projectController.update).
    delete(projectController.delete)

export default router;