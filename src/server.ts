import app from './index';
import { config } from './config';
import {
  connectPrisma,
  setupPrismaShutdown,
  prisma,
} from './services/prisma.service';

(async () => {
  try {
    await connectPrisma();

    console.log('Warming up database connection...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection warmed up');

    setupPrismaShutdown();

    const server = app.listen(config.server.port, () => {
      console.log(`Server ready at: http://localhost:${config.server.port}`);
      console.log(`🌐 CORS Origin: ${config.server.corsOrigin}`);
    });

    return server;
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
