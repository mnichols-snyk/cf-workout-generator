import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

/**
 * Sets the tenant context for database queries to enforce Row-Level Security
 * @param prisma - Prisma client instance
 * @param tenantId - The gym ID to set as tenant context
 * @param isSuperuser - Whether the current user is a superuser
 */
export async function setTenantContext(
  prisma: PrismaClient,
  tenantId: string | null,
  isSuperuser: boolean = false
): Promise<void> {
  // Set the tenant ID for RLS policies
  if (tenantId) {
    await prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, true)`;
  }
  
  // Set superuser flag for RLS policies
  await prisma.$executeRaw`SELECT set_config('app.is_superuser', ${isSuperuser.toString()}, true)`;
}

/**
 * Clears the tenant context
 * @param prisma - Prisma client instance
 */
export async function clearTenantContext(prisma: PrismaClient): Promise<void> {
  await prisma.$executeRaw`SELECT set_config('app.tenant_id', '', true)`;
  await prisma.$executeRaw`SELECT set_config('app.is_superuser', 'false', true)`;
}

/**
 * Executes a function with tenant context set
 * @param prisma - Prisma client instance
 * @param tenantId - The gym ID to set as tenant context
 * @param isSuperuser - Whether the current user is a superuser
 * @param fn - Function to execute with tenant context
 */
export async function withTenantContext<T>(
  prisma: PrismaClient,
  tenantId: string | null,
  isSuperuser: boolean,
  fn: () => Promise<T>
): Promise<T> {
  await setTenantContext(prisma, tenantId, isSuperuser);
  try {
    return await fn();
  } finally {
    await clearTenantContext(prisma);
  }
}
