import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Accessories({ categories, tags, colors }: ISeedProps) {
  const Mi_POWER_BANK_20K = await prisma.product.create({
    data: {
      description: 'Black 50w power bank from xiaomi',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_POWER_BANK_20K_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Mi Power Bank 20000mah',
      slug: 'mi-black-power-bank-20000mah',
      productId: Mi_POWER_BANK_20K.id,
      colorId: colors.Black.id,
      stock: 15,
      price: 1299,
      oldPrice: 1499,
      images: {
        create: [
          {
            url: '7cf4c98e-2efb-4cb5-a736-b16b4350555b-68odnw.webp',
            isMain: true,
            productId: Mi_POWER_BANK_20K.id,
          },
        ],
      },
    },
  });

  const Mi_POWER_BANK_10K = await prisma.product.create({
    data: {
      description: 'Silver power bank from xiaomi with 2usb type c ports',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_POWER_BANK_10K_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Mi 3 Power Bank 10000mah',
      slug: 'mi-3-silver-power-bank-10000mah',
      productId: Mi_POWER_BANK_10K.id,
      colorId: colors.Silver.id,
      stock: 3,
      price: 399,
      images: {
        create: [
          {
            url: 'b74ce53b-09b2-4eb3-b7d6-60cb61ae7439-w88i55.webp',
            isMain: true,
            productId: Mi_POWER_BANK_10K.id,
          },
        ],
      },
    },
  });

  const Mi_SMART_SPEAKER = await prisma.product.create({
    data: {
      description: 'Black Speakers with ir control from xiaomi',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_SMART_SPEAKER_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Smart speaker ir control',
      slug: 'smart-speaker-ir-control',
      productId: Mi_SMART_SPEAKER.id,
      colorId: colors.Black.id,
      stock: 2,
      price: 799,
      images: {
        create: [
          {
            url: '7f31afea-cce6-4c68-8806-6a4d027d572c-uh0r1n.webp',
            isMain: true,
            productId: Mi_SMART_SPEAKER.id,
          },
        ],
      },
    },
  });

  const Mi_BUDS_5 = await prisma.product.create({
    data: {
      description: 'Wireless earphones from xiaomi',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_BUDS_5_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Buds 5 black',
      slug: 'buds-5-black',
      productId: Mi_BUDS_5.id,
      colorId: colors.Black.id,
      stock: 2,
      price: 1699,
      oldPrice: 1999,
      images: {
        create: [
          {
            url: 'c9a2d347-d83f-48fa-9c44-e910646a7c0b-7zifgf.webp',
            isMain: true,
            productId: Mi_BUDS_5.id,
          },
        ],
      },
    },
  });

  const Mi_BUDS_5_PRO = await prisma.product.create({
    data: {
      description: 'Wireless earphones from xiaomi',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_BUDS_5_PRO_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Redmi Buds 5 Pro Aurora Purple',
      slug: 'redmi-buds-5-pro-aurora-purple',
      productId: Mi_BUDS_5_PRO.id,
      colorId: colors.Purple.id,
      stock: 1,
      price: 1499,
      oldPrice: 1599,
      images: {
        create: [
          {
            url: 'b25d4fac-a127-47d1-9a34-4f9e2b4d71c4-ipwn3q.webp',
            isMain: true,
            productId: Mi_BUDS_5_PRO.id,
          },
        ],
      },
    },
  });

  const Mi_BUDS_5_SKY = await prisma.product.create({
    data: {
      description: 'Wireless earphones bluetooth v5.3',
      categoryId: categories.AccessoriesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }],
      },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Mi_BUDS_5_SKY_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Redmi Buds 5 Sky Blue',
      slug: 'redmi-buds-5-sky-blue',
      colorId: colors.Blue.id,
      productId: Mi_BUDS_5_SKY.id,
      stock: 2,
      price: 699,
      images: {
        create: [
          {
            url: '46518531-f0e4-4876-ba58-77c164d8a49a-b2bp07.webp',
            isMain: true,
            productId: Mi_BUDS_5_SKY.id,
          },
        ],
      },
    },
  });
}
