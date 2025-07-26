import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'DATABASE_URL',
  'API_KEY',
  'BCRYPT_SALT_ROUNDS',
  'JWT_EXPIRES_IN',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  database: {
    url: process.env.DATABASE_URL,
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },
  auth: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
  },
  api: {
    key: process.env.API_KEY,
  },
} as const;

export type Config = typeof config;
