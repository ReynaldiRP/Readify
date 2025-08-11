import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { handleTokenRefresh } from '../services/token.service';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Access token is required',
      });
    }

    try {
      const decoded = jwt.verify(token, config.auth.jwtSecret) as {
        userId: string;
      };

      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError && token) {
        try {
          const result = await handleTokenRefresh(refreshToken);

          res.setHeader('X-New-Access-Token', result.accessToken);

          req.user = result.user;
          next();
        } catch (error) {
          return res.status(401).json({
            error: 'Token refresh failed',
          });
        }
      } else {
        return res.status(401).json({
          error: 'Invalid token',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
};
