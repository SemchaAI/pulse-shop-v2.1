import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Redmi({
  categories,
  colors,
  memory,
  ram,
  tags,
}: ISeedProps) {
  const REDMI_13C = await prisma.product.create({
    data: {
      description:
        'Xiaomi Redmi 13C combines affordability, high technology and stylish design, making it an ideal choice for those looking for a quality smartphone at a reasonable price. This device features a 6.74-inch 90Hz screen that delivers bright and clear images and is also certified for low blue light, making it easy on the eyes to use.',
      categoryId: categories.SmartphonesCategory.id,
      tags: {
        connect: [
          { id: tags.XiaomiTag.id },
          { id: tags.BudgetTag.id },
          { id: tags.Winter2023Tag.id },
        ],
      },
      ProductInfo: {
        createMany: {
          data: [
            { title: 'Brand', description: 'Xiaomi' },
            {
              title: 'Weight',
              description: '192g',
            },
            {
              title: 'Display Type',
              description: 'IPS LCD',
            },
            {
              title: 'Display Size',
              description: '6.74"',
            },
            {
              title: 'Display Resolution',
              description: '720 x 1600 pixels',
            },
            {
              title: 'Display Refresh Rate',
              description: '90Hz',
            },
          ],
        },
      },
    },
  });

  const REDMI_13C_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/128GB Black',
      slug: 'redmi-13c-4gb-128gb-black',
      productId: REDMI_13C.id,
      stock: 5,
      price: 2399,
      colorId: colors.Black.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM4GB.id,
    },
  });
  const REDMI_13C_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/256GB Black',
      slug: 'redmi-13c-4gb-256gb-black',
      productId: REDMI_13C.id,
      stock: 5,
      price: 3499,
      colorId: colors.Black.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM4GB.id,
    },
  });
  const REDMI_13C_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/128GB Green',
      slug: 'redmi-13c-4gb-128gb-green',
      productId: REDMI_13C.id,
      stock: 5,
      price: 2399,
      colorId: colors.Green.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM4GB.id,
    },
  });
  const REDMI_13C_VARIANT4 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/256GB Green',
      slug: 'redmi-13c-4gb-256gb-green',
      productId: REDMI_13C.id,
      stock: 5,
      price: 3499,
      colorId: colors.Green.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM4GB.id,
    },
  });
  const REDMI_13C_VARIANT5 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/128GB Blue',
      slug: 'redmi-13c-4gb-128gb-blue',
      productId: REDMI_13C.id,
      stock: 5,
      price: 2399,
      colorId: colors.Blue.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM4GB.id,
    },
  });
  const REDMI_13C_VARIANT6 = await prisma.productVariant.create({
    data: {
      name: 'Redmi 13C 4GB/256GB Blue',
      slug: 'redmi-13c-4gb-256gb-blue',
      productId: REDMI_13C.id,
      stock: 5,
      price: 3499,
      colorId: colors.Blue.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM4GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT1 = await prisma.image.createMany({
    data: [
      {
        url: '8c2c8881-34d3-4bd3-8668-c5e8018a74b3-6g3he5.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT1.id,
      },
      {
        url: '40972ed7-611d-4be4-b34e-a554788c9ca7-22ipdt.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT1.id,
      },
      {
        url: '54aa0c0f-e52f-4ec9-8665-3ebefd4590ca-22ipds.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT1.id,
      },
      {
        url: '6cb0145c-1321-4854-92bc-59d42e03ed80-22ipdr.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT2 = await prisma.image.createMany({
    data: [
      {
        url: '8c2c8881-34d3-4bd3-8668-c5e8018a74b3-6g3he5.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT2.id,
      },
      {
        url: '40972ed7-611d-4be4-b34e-a554788c9ca7-22ipdt.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT2.id,
      },
      {
        url: '54aa0c0f-e52f-4ec9-8665-3ebefd4590ca-22ipds.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT2.id,
      },
      {
        url: '6cb0145c-1321-4854-92bc-59d42e03ed80-22ipdr.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT3 = await prisma.image.createMany({
    data: [
      {
        url: '5434e573-2cfc-4039-b9a9-f52ee0ed2938-6iydap.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT3.id,
      },
      {
        url: '3ef662c1-7935-44e1-b226-0c4d361fdbd6-2gvo91.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT3.id,
      },
      {
        url: '3c2ba76f-0869-486d-b68c-bc6ad8e0c589-2gvo90.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT3.id,
      },
      {
        url: '8417e3af-1def-4a34-8438-ee63ad4eab0b-2gvo8z.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT3.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT4 = await prisma.image.createMany({
    data: [
      {
        url: '5434e573-2cfc-4039-b9a9-f52ee0ed2938-6iydap.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT4.id,
      },
      {
        url: '3ef662c1-7935-44e1-b226-0c4d361fdbd6-2gvo91.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT4.id,
      },
      {
        url: '3c2ba76f-0869-486d-b68c-bc6ad8e0c589-2gvo90.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT4.id,
      },
      {
        url: '8417e3af-1def-4a34-8438-ee63ad4eab0b-2gvo8z.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT4.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT5 = await prisma.image.createMany({
    data: [
      {
        url: '2eebb236-63f3-4c8e-96bb-8f7e68069ec6-7wce42.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT5.id,
      },
      {
        url: '6abbb1b8-40bc-4ec7-ba54-68d949d70878-lvjxt8.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT5.id,
      },
      {
        url: '5e239a53-8da6-4d81-8363-18290bfab97a-lvjxt9.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT5.id,
      },
      {
        url: '9b39acd2-053f-4f7e-9aa8-bd59950145d3-lvjxta.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT5.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const REDMI_13C_IMG_VARIANT6 = await prisma.image.createMany({
    data: [
      {
        url: '2eebb236-63f3-4c8e-96bb-8f7e68069ec6-7wce42.webp',
        isMain: true,
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT6.id,
      },
      {
        url: '6abbb1b8-40bc-4ec7-ba54-68d949d70878-lvjxt8.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT6.id,
      },
      {
        url: '5e239a53-8da6-4d81-8363-18290bfab97a-lvjxt9.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT6.id,
      },
      {
        url: '9b39acd2-053f-4f7e-9aa8-bd59950145d3-lvjxta.webp',
        productId: REDMI_13C.id,
        variantId: REDMI_13C_VARIANT6.id,
      },
    ],
  });
}
