import { FastifyRequest, FastifyReply } from 'fastify';
import { Role } from '@prisma/client';
import { prisma } from '../db';
import { setTenantContext } from '../utils/tenant-context';

/**
 * Middleware to authenticate users and set tenant context for RLS
 */
export async function tenantMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Extract JWT token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ message: 'Authorization token required' });
    }

    // Verify JWT token
    const token = authHeader.substring(7);
    const decoded = await request.jwtVerify();
    
    // Type assertion for the decoded JWT payload
    const user = decoded as {
      id: string;
      email: string;
      role: Role;
      gymId: string;
    };

    // Set user information on request object
    request.user = user;

    // Set tenant context for RLS policies
    const isSuperuser = user.role === Role.SUPERUSER;
    const tenantId = isSuperuser ? null : user.gymId;
    
    await setTenantContext(prisma, tenantId, isSuperuser);

  } catch (error) {
    return reply.code(401).send({ message: 'Invalid or expired token' });
  }
}

/**
 * Optional middleware for routes that don't require authentication
 * but should set tenant context if a valid token is provided
 */
export async function optionalTenantMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const decoded = await request.jwtVerify();
      const user = decoded as {
        id: string;
        email: string;
        role: Role;
        gymId: string;
      };

      request.user = user;
      
      const isSuperuser = user.role === Role.SUPERUSER;
      const tenantId = isSuperuser ? null : user.gymId;
      
      await setTenantContext(prisma, tenantId, isSuperuser);
    } else {
      // No authentication provided, set default context
      await setTenantContext(prisma, null, false);
    }
  } catch (error) {
    // Invalid token, but don't fail the request for optional auth
    await setTenantContext(prisma, null, false);
  }
}
