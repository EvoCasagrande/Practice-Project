import { Router } from "express";
import { ProjectService } from "./projects.service.js";
import { ProjectController } from "./projects.controller.js";
import taskRouter from '../tasks/tasks.routes.js'
import { validarBody } from "../../middlewares/validarBody.js";
import { createProjectSchema, updateProjectSchema } from "../projects/projects.schema.js";

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

const router = Router({ mergeParams: true });

router.
    route('/').
    get(projectController.getAll).
    post(validarBody(createProjectSchema), projectController.create);

router.
    route('/:projectId').
    get(projectController.getById).
    patch(validarBody(updateProjectSchema), projectController.update).
    delete(projectController.delete)

router.use('/:projectId/tasks', taskRouter)

export default router;