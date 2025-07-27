import { Request, Response } from 'express';
import { login } from '../services/user.service';

export const userLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userData = req.body;
    const user = await login(userData, req);
    return res.status(201).json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken: user.accessToken,
      refreshToken: user.session.refreshToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: 'internal server error',
    });
  }
};
