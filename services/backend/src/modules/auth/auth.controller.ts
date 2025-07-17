import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { prisma } from '../../db';
import { LoginInput } from './auth.schema';
import { withTenantContext } from '../../utils/tenant-context';

export async function loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  const { email, password } = request.body;

  // Use tenant context for authentication query
  // For login, we need to bypass RLS to find the user first
  const user = await withTenantContext(
    prisma,
    null, // No tenant context for login
    true, // Bypass RLS for authentication
    async () => {
      return await prisma.user.findUnique({
        where: {
          email,
        },
      });
    },
  );

  if (!user) {
    return reply.code(401).send({ message: 'Invalid email or password' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return reply.code(401).send({ message: 'Invalid email or password' });
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    gymId: user.gymId,
  };

  const token = await reply.jwtSign(payload);

  return { accessToken: token };
}
