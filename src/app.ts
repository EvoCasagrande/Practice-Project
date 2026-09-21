import express, { type Application, type NextFunction } from 'express';
import userRouter from './modules/users/users.routes.js'
import authRouter from './modules/auth/auth.routes.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './utils/AppError.js';
import { autenticarUsuario } from './middlewares/autenticarUsuario.js';
import helmet from 'helmet';

const app: Application = express();

//Middlewares
app.use(helmet())
app.use(express.json());

//Routes
app.use('/api/v1/users', autenticarUsuario, userRouter);
app.use('/api/v1/auth', authRouter);

app.use((_req , _res, next: NextFunction): void => {
    const error = new AppError('Lo sentimos, esta página no existe.', 404);
    next(error);
});


app.use(errorHandler);



export default app;