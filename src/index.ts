import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { config } from './config/index';
import indexRoutes from './routes/index.route';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.server.corsOrigin,
    credentials: true,
  })
);

app.use('/api', indexRoutes);

export default app;
