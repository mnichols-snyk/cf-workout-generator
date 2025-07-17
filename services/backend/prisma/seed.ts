import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create a system-level gym for superusers
  const systemGym = await prisma.gym.upsert({
    where: { name: 'System' },
    update: {},
    create: {
      name: 'System',
    },
  });

  console.log(`Created system gym with id: ${systemGym.id}`);

  const superuserEmail = process.env.SUPERUSER_EMAIL;
  const superuserPassword = process.env.SUPERUSER_PASSWORD;

  if (!superuserEmail || !superuserPassword) {
    throw new Error('SUPERUSER_EMAIL and SUPERUSER_PASSWORD must be set in your .env file');
  }

  const hashedPassword = await bcrypt.hash(superuserPassword, 10);

  const superuser = await prisma.user.upsert({
    where: { email: superuserEmail },
    update: {},
    create: {
      email: superuserEmail,
      password: hashedPassword,
      role: Role.SUPERUSER,
      gymId: systemGym.id,
    },
  });

  console.log(`Created superuser with email: ${superuser.email}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
