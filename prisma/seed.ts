import { PrismaClient, Prisma } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient().$extends(withAccelerate());

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    passwordHash: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    passwordHash: bcrypt.hashSync('password', 10),
  },
];

const createUser = async () => {
  for (const user of userData) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    console.log(`Created user with id: ${createdUser.id}`);
  }
};

async function main() {
  console.log(`Start seeding ...`);
  await createUser();
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
