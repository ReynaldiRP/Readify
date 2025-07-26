import app from './index';
import { config } from './config';
import { connectPrisma, setupPrismaShutdown } from './services/prisma.service';

(async () => {
  try {
    await connectPrisma();

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
