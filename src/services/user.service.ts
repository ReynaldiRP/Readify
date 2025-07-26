import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma.service';
import { config } from '../config';
import jwt, { SignOptions } from 'jsonwebtoken';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (
  userData: LoginData
): Promise<User & { token: string }> => {
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

    const token = createJwtToken(userData);

    return {
      ...user,
      token,
    };
  } catch (error) {
    throw error;
  }
};

const createJwtToken = (userData: LoginData) => {
  const { email, password } = userData;
  const { jwtSecret, jwtExpiresIn } = config.auth;

  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }

  const token = jwt.sign(
    { email, password },
    jwtSecret as jwt.Secret,
    {
      expiresIn: jwtExpiresIn,
    } as SignOptions
  );

  return token;
};

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
