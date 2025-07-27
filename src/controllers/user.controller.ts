import { Request, Response } from 'express';
import { login, register, logout } from '../services/user.service';

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

export const userRegister = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userData = req.body;
    const user = await register(userData);
    return res.status(201).json({
      message: 'User register in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
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

export const userLogout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: 'User ID not found in token.',
      });
    }

    await logout(userId);

    return res.status(200).json({
      message: 'User logged out successfully',
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
