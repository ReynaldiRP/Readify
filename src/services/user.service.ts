import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { prisma } from './prisma.service';
import { createSession, clearUserSessions } from './session.service';
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from './token.service';

interface AuthData {
  email: string;
  password: string;
}

interface SessionData {
  userId: string;
  userAgent: string | null;
  ipAddress: string | null;
  refreshToken: string;
  expiredAt: Date;
}

export const login = async (
  userData: AuthData,
  req: Request
): Promise<User & { session: SessionData; accessToken: string }> => {
  try {
    const { email, password } = userData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Email is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Email or password is incorrect');
    }

    await clearUserSessions(user.id);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    const session = await createSession(user.id, req, hashedRefreshToken);

    return {
      ...user,
      session,
      accessToken: accessToken,
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (userData: AuthData) => {
  try {
    
  } catch (error) {
    
  }
}

const checkUserEmail = async (email: string): Promise<User | null> => {
  try {
    const isUserEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserEmailExist) {
      throw new Error('Email already exists');
    }

    return isUserEmailExist;
  } catch (error) {
    throw error;
  }
};
