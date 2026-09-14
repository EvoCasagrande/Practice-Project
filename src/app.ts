import express, { Application } from 'express';
import userRouter from './modules/users/users.routes.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app: Application = express();

//Middlewares

app.use(express.json());

//Routes
app.use('/api/v1/users', userRouter)
app.use(errorHandler);


export default app;