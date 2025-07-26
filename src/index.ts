import dotenv from 'dotenv';
import { Prisma, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import express from 'express';

dotenv.config();

const prisma = new PrismaClient().$extends(withAccelerate());

const app = express();

app.use(express.json());

export default app;
