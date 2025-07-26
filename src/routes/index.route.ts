import express from 'express';
import userRoutes from './user.route';

const router = express.Router();

router.use('/v1', userRoutes);

export default router;
