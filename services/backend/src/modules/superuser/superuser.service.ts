import { prisma } from '../../db';
import { SetTermsAndConditionsInput, ToggleGymStatusInput } from './superuser.schema';
import { withTenantContext } from '../../utils/tenant-context';

export async function setTermsAndConditions(input: SetTermsAndConditionsInput) {
  return withTenantContext(prisma, null, true, async () => {
    const existingTerms = await prisma.termsAndConditions.findFirst();

    if (existingTerms) {
      return prisma.termsAndConditions.update({
        where: { id: existingTerms.id },
        data: { content: input.content },
      });
    } else {
      return prisma.termsAndConditions.create({
        data: { content: input.content },
      });
    }
  });
}

export async function getAllGyms() {
  // Execute the query within a superuser context to bypass RLS
  return withTenantContext(prisma, null, true, () => {
    return prisma.gym.findMany();
  });
}

export async function toggleGymStatus(input: ToggleGymStatusInput) {
  return withTenantContext(prisma, null, true, async () => {
    // First check if the gym exists
    const existingGym = await prisma.gym.findUnique({
      where: { id: input.gymId },
    });

    if (!existingGym) {
      throw new Error(`Gym with ID ${input.gymId} not found`);
    }

    // Update the gym's active status
    return prisma.gym.update({
      where: { id: input.gymId },
      data: { isActive: input.isActive },
    });
  });
}
