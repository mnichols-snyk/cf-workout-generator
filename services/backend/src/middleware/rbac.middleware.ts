import { FastifyRequest, FastifyReply } from 'fastify';
import { Role } from '@prisma/client';

// Define a type for the expected user payload from the JWT
interface UserPayload {
  id: string;
  email: string;
  role: Role;
  gymId: string;
}

// Type guard to check if the payload is a valid UserPayload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserPayload(payload: any): payload is UserPayload {
  return payload && typeof payload === 'object' && 'role' in payload && Object.values(Role).includes(payload.role);
}

export function rbacMiddleware(roles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;

    if (!isUserPayload(user) || !roles.includes(user.role)) {
      return reply.code(403).send({ message: 'Forbidden: Insufficient permissions' });
    }

    return;
  };
}
