import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { config } from '../config';
import ms, { StringValue } from 'ms';
import { prisma } from './prisma.service';

export const generateAccessToken = (userId: string): string => {
  const { jwtSecret, jwtExpiresIn } = config.auth;
  if (!jwtSecret) throw new Error('JWT secret is not defined');

  const payload = { userId };
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (): string => {
  return randomBytes(40).toString('hex');
};

export const hashRefreshToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

export const createExpirationDate = (expirationTime: StringValue): Date => {
  try {
    const expirationMs = ms(expirationTime);

    if (typeof expirationMs !== 'number' || isNaN(expirationMs)) {
      throw new Error('Invalid expiration time');
    }

    return new Date(Date.now() + expirationMs);
  } catch (error) {
    throw error;
  }
};

export const handleTokenRefresh = async (refreshToken: string) => {
  try {
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    const session = await prisma.session.findUnique({
      where: { refreshToken: hashedRefreshToken },
      include: { user: true },
    });

    if (!session) {
      throw new Error('Invalid refresh token');
    }

    if (session.expiredAt < new Date()) {
      await prisma.session.delete({
        where: { id: session.id },
      });

      throw new Error('Refresh token expired');
    }

    const newAccessToken = generateAccessToken(session.user.id);

    return {
      accessToken: newAccessToken,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
    };
  } catch (error) {
    throw error;
  }
};
