import { Prisma, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

let isConnected = false;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
}).$extends(withAccelerate());

export const connectPrisma = async (): Promise<void> => {
  if (isConnected) return;
  try {
    await prisma.$connect();
    isConnected = true;
  } catch (error) {
    console.error('Failed to connect to Prisma:', error);
    throw error;
  }
};

export const disconnectPrisma = async (): Promise<void> => {
  try {
    if (isConnected) {
      await prisma.$disconnect();
      isConnected = false;
      console.log('✅ Prisma disconnected');
    }
  } catch (error) {
    console.error('Failed to disconnect from Prisma:', error);
    throw error;
  }
};

export const setupPrismaShutdown = (): void => {
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received, closing Prisma connection...`);
    await disconnectPrisma();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('beforeExit', () => shutdown('beforeExit'));
};
