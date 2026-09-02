import express, { Application, Request, Response} from 'express';
import userRouter from './modules/users/users.routes'

const app: Application = express();

//Middlewares

app.use(express.json());

//Routes
app.use('/api/v1/users', userRouter)

export default app;