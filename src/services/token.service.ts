import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { config } from '../config';
import ms, { StringValue } from 'ms';

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
