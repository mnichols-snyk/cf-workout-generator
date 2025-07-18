// Load environment variables in development
try {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv' + '/config');
  }
} catch (error) {
  // Ignore dotenv errors in production
}

import { buildServer } from './server';
import logger from './logger';
import authRoutes from './modules/auth/auth.route';
import superuserRoutes from './modules/superuser/superuser.route';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function start() {
  const server = buildServer();

  // Register JWT plugin
  await server.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET as string,
  });

  // Register routes
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(superuserRoutes, { prefix: '/api/superuser' });

  // Health check route
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  try {
    await server.listen({ port, host: '0.0.0.0' });
    logger.info(`Server listening on http://localhost:${port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();
