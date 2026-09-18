import { Router } from 'express';
import { UserService } from './users.service.js';
import { UserController } from './users.controller.js';
import projectRouter from '../projects/projects.routes.js'
import { updateUserSchema } from './users.schema.js';
import { validarBody } from '../../middlewares/validarBody.js';
import { autorizarUsuario } from '../../middlewares/autorizarUsuario.js';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.
    route('/')

router.
    route('/:userId').
    get(autorizarUsuario, userController.getById).
    patch(autorizarUsuario, validarBody(updateUserSchema), userController.update).
    delete( autorizarUsuario, userController.delete);

router.use('/:userId/projects', autorizarUsuario, projectRouter)

export default router;