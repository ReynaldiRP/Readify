import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        error: 'Access token is required',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.auth.jwtSecret) as {
        userId: string;
      };
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'Access token expired or invalid',
        code: 'TOKEN_EXPIRED',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
};
