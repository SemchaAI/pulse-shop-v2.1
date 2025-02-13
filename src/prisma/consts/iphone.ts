import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Iphone16({
  categories,
  colors,
  memory,
  ram,
  tags,
}: ISeedProps) {
  const Iphone16 = await prisma.product.create({
    data: {
      description:
        'iPhone 16 is built for Apple Intelligence, the personal intelligence system that helps you write, express yourself, and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple. iPhone 16 has a sturdy, aerospace-grade aluminum enclosure and strong — and beautiful — color-infused glass on the back. The latest-generation Ceramic Shield material is two times tougher than any smartphone glass. And a new internal design dissipates heat more effectively, so you’ll get better performance overall, especially when it comes to gaming.',
      categoryId: categories.SmartphonesCategory.id,
      tags: {
        connect: [{ id: tags.AppleTag.id }, { id: tags.FlagshipTag.id }],
      },

      ProductInfo: {
        createMany: {
          data: [
            { title: 'Brand', description: 'Apple' },
            {
              title: 'Weight',
              description: '170g',
            },
            {
              title: 'Display Type',
              description: 'Super Retina XDR OLED',
            },
            {
              title: 'Display Size',
              description: '6.1"',
            },
            {
              title: 'Display Resolution',
              description: '2556 x 1179 pixels',
            },
            {
              title: 'Display Refresh Rate',
              description: '60 Hz',
            },
          ],
        },
      },
    },
  });
  const Iphone16_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'iPhone 16 8GB/128GB Blue',
      slug: 'iphone-16-8gb-128gb-blue',
      productId: Iphone16.id,
      stock: 5,
      price: 19999,
      colorId: colors.Blue.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const Iphone16_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'iPhone 16 8GB/256GB Blue',
      slug: 'iphone-16-8gb-256gb-blue',
      productId: Iphone16.id,
      stock: 5,
      price: 22699,
      colorId: colors.Blue.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const Iphone16_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'iPhone 16 8GB/512GB Blue',
      slug: 'iphone-16-8gb-512gb-blue',
      productId: Iphone16.id,
      stock: 5,
      price: 27399,
      colorId: colors.Blue.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM8GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Iphone16_IMG1 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20KMvk7yraIMCrcdJ4VUw6ZNsDR3EbF7qe58SL',
        isMain: true,
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20391iR47nRI0vKHLDb7yFP2s9E1ghqJackwGA',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20hBhAiuGNfxjA56vnXRsbil1dgDytMw7ZWQqJ',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20hOQQxgnGNfxjA56vnXRsbil1dgDytMw7ZWQq',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm203Y45ztnRI0vKHLDb7yFP2s9E1ghqJackwGAj',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20ZPwPNp0Ldm20SlEVioQ5AuwUWN8yajYL31GX',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Iphone16_IMG2 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20KMvk7yraIMCrcdJ4VUw6ZNsDR3EbF7qe58SL',
        isMain: true,
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20391iR47nRI0vKHLDb7yFP2s9E1ghqJackwGA',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20hBhAiuGNfxjA56vnXRsbil1dgDytMw7ZWQqJ',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20hOQQxgnGNfxjA56vnXRsbil1dgDytMw7ZWQq',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm203Y45ztnRI0vKHLDb7yFP2s9E1ghqJackwGAj',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20ZPwPNp0Ldm20SlEVioQ5AuwUWN8yajYL31GX',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Iphone16_IMG3 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20KMvk7yraIMCrcdJ4VUw6ZNsDR3EbF7qe58SL',
        isMain: true,
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20391iR47nRI0vKHLDb7yFP2s9E1ghqJackwGA',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20hBhAiuGNfxjA56vnXRsbil1dgDytMw7ZWQqJ',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20hOQQxgnGNfxjA56vnXRsbil1dgDytMw7ZWQq',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm203Y45ztnRI0vKHLDb7yFP2s9E1ghqJackwGAj',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20ZPwPNp0Ldm20SlEVioQ5AuwUWN8yajYL31GX',
        productId: Iphone16.id,
        variantId: Iphone16_VARIANT3.id,
      },
    ],
  });
}
