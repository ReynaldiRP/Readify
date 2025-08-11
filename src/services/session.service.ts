import { Prisma } from '@prisma/client';
import { Request } from 'express';
import * as tokeService from './token.service';
import { config } from '../config';
import { StringValue } from 'ms';
import { prisma } from './prisma.service';
import { SessionData } from '../types/session';

export const createSession = async (
  userId: string,
  req: Request,
  token: string
): Promise<SessionData> => {
  try {
    const expirationDate = tokeService.createExpirationDate(
      config.auth.jwtExpiresIn as StringValue
    );

    const sessionData: Prisma.SessionCreateInput = {
      user: { connect: { id: userId } },
      userAgent: req.headers['user-agent'] || '',
      ipAddress: req.ip,
      refreshToken: token,
      expiredAt: expirationDate,
      updatedAt: null,
    };

    const session = await prisma.session.create({
      data: sessionData,
    });

    if (!session) {
      throw new Error('Session creation failed');
    }

    return session;
  } catch (error) {
    throw error;
  }
};

export const clearUserSessions = async (userId: string): Promise<void> => {
  try {
    const session = await prisma.session.deleteMany({
      where: { userId },
    });

    if (!session) {
      throw new Error('Session deletion failed');
    }
  } catch (error) {
    throw error;
  }
};
