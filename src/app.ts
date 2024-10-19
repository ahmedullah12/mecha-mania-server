import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routeNotFound from './app/middlewares/routeNotFound';

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://mecha-mania.netlify.app',
      'https://mecha-mania.vercel.app',
    ],
    credentials: true,
  }),
);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running!');
});

app.use(globalErrorHandler);
app.use(routeNotFound);

export default app;
