import { Router } from 'express';
import { UserService } from './users.service.js';
import { UserController } from './users.controller.js';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.
    route('/').
    get(userController.getAll).
    post(userController.create);

router.
    route('/:id').
    get(userController.getById).
    patch(userController.update).
    delete(userController.delete);

export default router;