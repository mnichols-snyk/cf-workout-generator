// Load environment variables in development
try {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv' + '/config');
  }
} catch (error) {
  // Ignore dotenv errors in production
}
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import logger from './logger';
import authRoutes from './modules/auth/auth.route';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function buildServer() {
  const server = fastify({ logger });

  // Set Zod as the default validator and serializer
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Register JWT plugin
  await server.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET as string,
  });

  // Register routes
  await server.register(authRoutes, { prefix: '/api/auth' });

  // Health check route
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  return server;
}

async function start() {
  const server = await buildServer();
  try {
    await server.listen({ port, host: '0.0.0.0' }); // Listen on all interfaces
    logger.info(`Server listening on http://localhost:${port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();
