import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Pads({
  categories,
  colors,
  memory,
  ram,
  tags,
}: ISeedProps) {
  const PAD6 = await prisma.product.create({
    data: {
      description:
        'Buy the new Pad 6 from Xiaomi, a premium brand product that offers outstanding performance and design. With a maximum processor speed of 3.2GHz and Snapdragon 870 processor, this tablet delivers fast and smooth performance. The IPS screen with a 144Hz refresh rate and 2880 x 1800 resolution displays crisp, detailed images. The elegant and compact design with an aluminum body and dimensions of 254 x 165.2 x 6.5 mm is impressive at first glance.',
      categoryId: categories.TabletsCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }, { id: tags.MidRangeTag.id }],
      },
      ProductInfo: {
        createMany: {
          data: [
            { title: 'Brand', description: 'Xiaomi' },
            {
              title: 'Weight',
              description: '490g',
            },
            {
              title: 'Display Type',
              description: 'IPS LCD',
            },
            {
              title: 'Display Size',
              description: '11"',
            },
            {
              title: 'Display Resolution',
              description: '1800 x 2880 pixels',
            },
            {
              title: 'Display Refresh Rate',
              description: '144 Гц',
            },
          ],
        },
      },
    },
  });
  const PAD6_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi Pad 6 8GB/128GB Gray',
      slug: 'xiaomi-pad-6-8gb-128gb-gray',
      productId: PAD6.id,
      stock: 2,
      price: 7099,
      oldPrice: 8099,
      colorId: colors.Gray.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const PAD6_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi Pad 6 8GB/256GB Gray',
      slug: 'xiaomi-pad-6-8gb-256gb-gray',
      productId: PAD6.id,
      stock: 2,
      price: 7499,
      oldPrice: 8999,
      colorId: colors.Gray.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const PAD6_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi Pad 6 8GB/256GB Gold',
      slug: 'xiaomi-pad-6-8gb-256gb-gold',
      productId: PAD6.id,
      stock: 2,
      price: 7499,
      oldPrice: 8999,
      colorId: colors.Gold.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PAD6_IMG_VARIANT1 = await prisma.image.createMany({
    data: [
      {
        url: '39138a79-4149-416d-9408-70608e0cab23-dcw2zm.webp',
        isMain: true,
        productId: PAD6.id,
        variantId: PAD6_VARIANT1.id,
      },
      {
        url: '7d69b073-555a-48ec-9152-b336e356a92a-a2glu4.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT1.id,
      },
      {
        url: '444d1c1c-714d-4710-b024-f07512e987c8-a2glu5.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT1.id,
      },
      {
        url: '5de3fe61-e38c-4088-85de-7314b94ef725-a2glu6.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PAD6_IMG_VARIANT2 = await prisma.image.createMany({
    data: [
      {
        url: '39138a79-4149-416d-9408-70608e0cab23-dcw2zm.webp',
        isMain: true,
        productId: PAD6.id,
        variantId: PAD6_VARIANT2.id,
      },
      {
        url: '7d69b073-555a-48ec-9152-b336e356a92a-a2glu4.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT2.id,
      },
      {
        url: '444d1c1c-714d-4710-b024-f07512e987c8-a2glu5.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT2.id,
      },
      {
        url: '5de3fe61-e38c-4088-85de-7314b94ef725-a2glu6.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PAD6_IMG_VARIANT3 = await prisma.image.createMany({
    data: [
      {
        url: 'e3bfab6d-f221-45f0-abe5-077d967b890a-qi52dg.webp',
        isMain: true,
        productId: PAD6.id,
        variantId: PAD6_VARIANT3.id,
      },
      {
        url: '35bcb5a1-9899-4409-8228-f4b00aa65560-7z4oz3.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT3.id,
      },
      {
        url: '2eb94db5-8ad5-43aa-b8d5-5e468c12217f-7z4oz4.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT3.id,
      },
      {
        url: '29a39fa1-3ae7-4f58-b81f-6686553ca3a8-7z4oz5.webp',
        productId: PAD6.id,
        variantId: PAD6_VARIANT3.id,
      },
    ],
  });
}
