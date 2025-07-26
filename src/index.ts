import dotenv from 'dotenv';
import { Prisma, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import express from 'express';
import cors from 'cors';
import { config } from './config/index';

dotenv.config();

const prisma = new PrismaClient().$extends(withAccelerate());

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.server.corsOrigin,
    credentials: true,
  })
);

export default app;
