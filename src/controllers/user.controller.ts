import { Request, Response } from 'express';
import { login } from '../services/user.service';

export const userLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userData = req.body;
    const user = await login(userData);
    return res.status(201).json({
      message: 'User logged in successfully',
      user: {
        name: user.name,
        email: user.email,
      },
      token: user.token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
