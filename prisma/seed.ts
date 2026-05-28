import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcryptjs from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Categories
  const categories = [
    { name: 'Plugins', slug: 'plugins', icon: '🔌' },
    { name: 'Websites', slug: 'websites', icon: '🌐' },
    { name: 'Setups', slug: 'setups', icon: '⚙️' },
    { name: 'Models', slug: 'models', icon: '🎨' },
    { name: 'Maps', slug: 'maps', icon: '🗺️' },
    { name: 'Configs', slug: 'configs', icon: '📋' },
    { name: 'Scripts', slug: 'scripts', icon: '📜' },
    { name: 'DC Stuff', slug: 'dc-stuff', icon: '🤖' },
    { name: 'Ptero', slug: 'ptero', icon: '🦕' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories seeded.');

  // 2. Founder Admin Account
  const adminEmail = 'founder@developerneeds.com';
  const adminPassword = await bcryptjs.hash('Password123!', 12);

  const founder = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      username: 'Founder',
      email: adminEmail,
      passwordHash: adminPassword,
      role: 'FOUNDER',
    },
  });
  console.log('Founder account created (founder@developerneeds.com / Password123!).');

  // 3. Sample Products
  const sampleCat = await prisma.category.findUnique({ where: { slug: 'plugins' } });
  if (sampleCat && founder) {
    const productExists = await prisma.product.findFirst();
    if (!productExists) {
      await prisma.product.create({
        data: {
          title: 'Advanced Economy Plus',
          description: 'The ultimate economy plugin for your Minecraft server. Features physical currency, banks, shops, and more.',
          downloadLink: 'https://github.com',
          status: 'APPROVED',
          featured: true,
          categoryId: sampleCat.id,
          authorId: founder.id,
        },
      });
      console.log('Sample product created.');
    }
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
