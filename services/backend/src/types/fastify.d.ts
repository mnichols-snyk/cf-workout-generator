import { Role } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
      role: Role;
      gymId: string;
    };
  }
}
