import {
  Categories,
  Colors,
  Memory,
  ProductInfo,
  ProductItemsSimple,
  ProductItemsSmartphones,
  ProductItemThumbnails,
  Products,
  RAM,
} from './consts';
import { prisma } from './prismaClient';

async function up() {
  await prisma.category.createMany({
    data: Categories.map(({ id, ...props }) => props),
  });
  ///-------------------------------
  await prisma.color.createMany({
    data: Colors.map(({ id, ...props }) => props),
  });
  await prisma.memory.createMany({
    data: Memory.map(({ id, ...props }) => props),
  });
  await prisma.ram.createMany({
    data: RAM.map(({ id, ...props }) => props),
  });
  ///-------------------------------

  const products = Products.map(({ id, ...props }) => props);

  for (let i = 0; i < products.length; i++) {
    await prisma.product.create({
      data: {
        ...products[i],
        colors: {
          connect: products[i].colors,
        },
        ram: {
          connect: products[i].ram,
        },
        memory: {
          connect: products[i].memory,
        },
      },
    });
  }

  ///-------------------------------
  await prisma.productInfo.createMany({
    data: ProductInfo,
  });

  //
  await prisma.productItem.createMany({
    data: [...ProductItemsSmartphones, ...ProductItemsSimple],
  });
  await prisma.productImages.createMany({
    data: [...ProductItemThumbnails],
  });
}

async function down() {
  // await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Memory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ram" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductInfo" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductImages" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "CartProduct" RESTART IDENTITY CASCADE`;
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
