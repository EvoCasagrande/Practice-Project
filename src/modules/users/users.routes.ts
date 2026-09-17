import { Router } from 'express';
import { UserService } from './users.service.js';
import { UserController } from './users.controller.js';
import projectRouter from '../projects/projects.routes.js'
import { createUserSchema, updateUserSchema } from './users.schema.js';
import { validarBody } from '../../middlewares/validarBody.js';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.
    route('/').
    get(userController.getAll)

router.
    route('/:userId').
    get(userController.getById).
    patch(validarBody(updateUserSchema), userController.update).
    delete(userController.delete);

router.use('/:userId/projects', projectRouter)

export default router;