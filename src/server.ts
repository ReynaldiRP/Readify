import app from './index';
import { config } from './config';

const server = app.listen(config.server.port, () => {
  console.log(`Server ready at: http://localhost:${config.server.port}`);
  console.log(`🌐 CORS Origin: ${config.server.corsOrigin}`);
});
