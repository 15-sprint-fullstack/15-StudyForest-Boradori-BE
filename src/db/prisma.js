import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '#config';
import { PrismaClient } from '#generated/prisma/client.ts';

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
