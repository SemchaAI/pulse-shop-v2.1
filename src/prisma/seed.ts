import {
  CategoriesInit,
  ColorsInit,
  MemoryInit,
  RAMInit,
  TagsInit,
} from './consts/simple';
import { prisma } from './prismaClient';
import { Poco } from './consts/poco';
import { Redmi } from './consts/redmi';
import { Pads } from './consts/pads';
import { Accessories } from './consts/accessories';
import { Xiaomi14T } from './consts/tSeria';
import { Iphone16 } from './consts/iphone';

export interface ISeedProps {
  categories: Awaited<ReturnType<typeof CategoriesInit>>;
  colors: Awaited<ReturnType<typeof ColorsInit>>;
  memory: Awaited<ReturnType<typeof MemoryInit>>;
  ram: Awaited<ReturnType<typeof RAMInit>>;
  tags: Awaited<ReturnType<typeof TagsInit>>;
}

async function up() {
  const categories = await CategoriesInit();
  const colors = await ColorsInit();
  const memory = await MemoryInit();
  const ram = await RAMInit();
  const tags = await TagsInit();

  await Poco({ categories, colors, memory, ram, tags });
  await Redmi({ categories, colors, memory, ram, tags });
  await Pads({ categories, colors, memory, ram, tags });
  await Accessories({ categories, colors, memory, ram, tags });
  await Xiaomi14T({ categories, colors, memory, ram, tags });
  await Iphone16({ categories, colors, memory, ram, tags });
}

async function down() {
  // await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Memory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ram" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tag" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductInfo" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "ProductImages" RESTART IDENTITY CASCADE`;
  // // await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  // // await prisma.$executeRaw`TRUNCATE TABLE "CartProduct" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
