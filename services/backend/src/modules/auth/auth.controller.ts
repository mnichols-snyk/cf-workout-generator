import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { prisma } from '../../db';
import { LoginInput } from './auth.schema';
import { Role } from '@prisma/client';

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || user.role !== Role.SUPERUSER) {
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
