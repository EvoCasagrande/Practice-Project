import { Router } from 'express';
import { UserService } from './users.service.js';
import { UserController } from './users.controller.js';
import projectRouter from '../projects/projects.routes.js'
import { updateUserSchema } from './users.schema.js';
import { validarBody } from '../../middlewares/validarBody.js';
import { autorizarUsuario } from '../../middlewares/autorizarUsuario.js';
import { autorizarAdmin } from '../../middlewares/autorizarAdmin.js';
import { autorizarUsuarioOAdmin } from '../../middlewares/autorizarUsuarioOAdmin.js';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.
    route('/')
    .get(autorizarAdmin, userController.getAll)

router.
    route('/:userId').
    get(autorizarUsuarioOAdmin, userController.getById).
    patch(autorizarUsuario, validarBody(updateUserSchema), userController.update).
    delete( autorizarUsuarioOAdmin, userController.delete);

router.use('/:userId/projects', autorizarUsuario, projectRouter)

export default router;