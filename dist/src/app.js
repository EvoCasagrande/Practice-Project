import express from 'express';
import userRouter from './modules/users/users.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './utils/AppError.js';
const app = express();
//Middlewares
app.use(express.json());
//Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use((_req, _res, next) => {
    const error = new AppError('Lo sentimos, esta página no existe.', 404);
    next(error);
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map