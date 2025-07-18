import { FastifyInstance } from 'fastify';
import { Role } from '@prisma/client';
import { tenantMiddleware } from '../../middleware/tenant.middleware';
import { rbacMiddleware } from '../../middleware/rbac.middleware';
import { getAllGymsHandler, setTermsAndConditionsHandler } from './superuser.controller';
import { setTermsAndConditionsSchema, toggleGymStatusSchema } from './superuser.schema';
import { toggleGymStatusHandler } from './superuser.controller';

async function superuserRoutes(server: FastifyInstance) {
  server.get(
    '/gyms',
    {
      preHandler: [tenantMiddleware, rbacMiddleware([Role.SUPERUSER])],
    },
    getAllGymsHandler,
  );

  server.post(
    '/terms-and-conditions',
    {
      schema: {
        body: setTermsAndConditionsSchema,
      },
      preHandler: [tenantMiddleware, rbacMiddleware([Role.SUPERUSER])],
    },
    setTermsAndConditionsHandler,
  );

  server.post(
    '/toggle-gym-status',
    {
      schema: {
        body: toggleGymStatusSchema,
      },
      preHandler: [tenantMiddleware, rbacMiddleware([Role.SUPERUSER])],
    },
    toggleGymStatusHandler,
  );
}

export default superuserRoutes;
