import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Xiaomi14T({
  categories,
  colors,
  memory,
  ram,
  tags,
}: ISeedProps) {
  const Xiaomi14T = await prisma.product.create({
    data: {
      description:
        'Power and Brightness in One Device. Xiaomi 14T is a modern solution for those looking for a famous and stylish smartphone. With dimensions of 160.5 x 75.1 x 7.8 mm and a weight of 195 g, this device fits comfortably in the hand, and its thin profile gives warmth. The display diagonal is 6.67 inches, the resolution of 1220 x 2712 pixels and the refresh rate of 144 Hz provide a crystal clear image and smooth movement on the screen. OLED technology makes the colors bright and saturated.',
      categoryId: categories.SmartphonesCategory.id,
      tags: {
        connect: [{ id: tags.XiaomiTag.id }, { id: tags.FlagshipTag.id }],
      },

      ProductInfo: {
        createMany: {
          data: [
            { title: 'Brand', description: 'Xiaomi' },
            {
              title: 'Weight',
              description: '195g',
            },
            {
              title: 'Display Type',
              description: 'OLED',
            },
            {
              title: 'Display Size',
              description: '6.67"',
            },
            {
              title: 'Display Resolution',
              description: '1220 x 2712 pixels',
            },
            {
              title: 'Display Refresh Rate',
              description: '144 Hz',
            },
          ],
        },
      },
    },
  });
  const Xiaomi14T_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/256GB Blue',
      slug: 'xiaomi-14t-12gb-256gb-blue',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10299,
      colorId: colors.Blue.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/512GB Blue',
      slug: 'xiaomi-14t-12gb-512gb-blue',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10999,
      colorId: colors.Blue.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/256GB Gray',
      slug: 'xiaomi-14t-12gb-256gb-gray',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10299,
      colorId: colors.Gray.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT4 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/512GB Gray',
      slug: 'xiaomi-14t-12gb-512gb-gray',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10999,
      colorId: colors.Gray.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT5 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/256GB Black',
      slug: 'xiaomi-14t-12gb-256gb-black',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10299,
      colorId: colors.Black.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT6 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/512GB Black',
      slug: 'xiaomi-14t-12gb-512gb-black',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10999,
      colorId: colors.Black.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT7 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/256GB Lemon Green',
      slug: 'xiaomi-14t-12gb-256gb-lemon-green',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10299,
      colorId: colors.LemonGreen.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const Xiaomi14T_VARIANT8 = await prisma.productVariant.create({
    data: {
      name: 'Xiaomi 14T 12GB/512GB Lemon Green',
      slug: 'xiaomi-14t-12gb-512gb-lemon-green',
      productId: Xiaomi14T.id,
      stock: 5,
      price: 10999,
      colorId: colors.LemonGreen.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM12GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG1 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20QequIQdy6YcuXHVw0jdemTr5lOQsIfMpCZAz',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20ZESIhKLdm20SlEVioQ5AuwUWN8yajYL31GXJ',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20I0kshQuP84oFAdzqKZIejtTO6rGUMbvJNngQ',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm2039ZbdSHnRI0vKHLDb7yFP2s9E1ghqJackwGA',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20Munhs0CBkzhnGdsZuNY7fpCSU534XgJoqeaP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm202QHYsXpDvHIJZYloTy9zPC0rBbnVfOeESmUj',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
      {
        url: 'ZPESD8WLdm20PTK2m8YbMwrj5ycKD0kYNALuagCvPR8IimOp',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG2 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20QequIQdy6YcuXHVw0jdemTr5lOQsIfMpCZAz',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20ZESIhKLdm20SlEVioQ5AuwUWN8yajYL31GXJ',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20I0kshQuP84oFAdzqKZIejtTO6rGUMbvJNngQ',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm2039ZbdSHnRI0vKHLDb7yFP2s9E1ghqJackwGA',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20Munhs0CBkzhnGdsZuNY7fpCSU534XgJoqeaP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm202QHYsXpDvHIJZYloTy9zPC0rBbnVfOeESmUj',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
      {
        url: 'ZPESD8WLdm20PTK2m8YbMwrj5ycKD0kYNALuagCvPR8IimOp',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG3 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20KMrwWE2aIMCrcdJ4VUw6ZNsDR3EbF7qe58SL',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20ITVTr2P84oFAdzqKZIejtTO6rGUMbvJNngQu',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20NY9xEke17lWMqzT0Z8kdmRGpUFnbVP2CxDrc',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20oE7uJB1UwSGuOtmAfTBNZ7KakgxY3WIylz62',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20rpg6cJ4TbnVxlQ7C2G3dUzADNZaOrItE1pko',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20VZIqJlw91FXwIxOof3CbiEUJHqatYdz84mgh',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
      {
        url: 'ZPESD8WLdm20oRY3th1UwSGuOtmAfTBNZ7KakgxY3WIylz62',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT3.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG4 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20KMrwWE2aIMCrcdJ4VUw6ZNsDR3EbF7qe58SL',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20ITVTr2P84oFAdzqKZIejtTO6rGUMbvJNngQu',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20NY9xEke17lWMqzT0Z8kdmRGpUFnbVP2CxDrc',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20oE7uJB1UwSGuOtmAfTBNZ7KakgxY3WIylz62',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20rpg6cJ4TbnVxlQ7C2G3dUzADNZaOrItE1pko',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20VZIqJlw91FXwIxOof3CbiEUJHqatYdz84mgh',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
      {
        url: 'ZPESD8WLdm20oRY3th1UwSGuOtmAfTBNZ7KakgxY3WIylz62',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT4.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG5 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20hC7cEbGNfxjA56vnXRsbil1dgDytMw7ZWQqJ',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20ejnQbZNgwpCF9B6lOWvzMuSRDfIj5V8Lhe4T',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20gz3FMwWboYeF34adG0TkzQvMsHwrmfX8IPA7',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20qtJ5VTFhGcC9lpr4SHadK0J7jVNZuv8sQLhX',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20NrCgQRe17lWMqzT0Z8kdmRGpUFnbVP2CxDrc',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20PEFtZSuYbMwrj5ycKD0kYNALuagCvPR8IimO',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
      {
        url: 'ZPESD8WLdm20GcsfMht2dMpP5ILwfW96GQbeSivjk0VZUDK1',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT5.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG6 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20hC7cEbGNfxjA56vnXRsbil1dgDytMw7ZWQqJ',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20ejnQbZNgwpCF9B6lOWvzMuSRDfIj5V8Lhe4T',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20gz3FMwWboYeF34adG0TkzQvMsHwrmfX8IPA7',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20qtJ5VTFhGcC9lpr4SHadK0J7jVNZuv8sQLhX',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20NrCgQRe17lWMqzT0Z8kdmRGpUFnbVP2CxDrc',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20PEFtZSuYbMwrj5ycKD0kYNALuagCvPR8IimO',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
      {
        url: 'ZPESD8WLdm20GcsfMht2dMpP5ILwfW96GQbeSivjk0VZUDK1',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT6.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG7 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20nOGoY4V6AQvbrWtE1y0PmJL5eVgCiaH7ocDG',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm20uuZBSoqhHaOQDNj0TFUWCtSdR3IvyPsLglqV',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm20I6QJH5P84oFAdzqKZIejtTO6rGUMbvJNngQu',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm20KfoOVGaIMCrcdJ4VUw6ZNsDR3EbF7qe58SLP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm2076fNrfZf6sKu1eoZqY2lha8nREHJrbW3QTMP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm20Q2Q5otdy6YcuXHVw0jdemTr5lOQsIfMpCZAz',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
      {
        url: 'ZPESD8WLdm20eHcwIHgwpCF9B6lOWvzMuSRDfIj5V8Lhe4Tt',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT7.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Xiaomi14T_IMG8 = await prisma.image.createMany({
    data: [
      {
        url: 'ZPESD8WLdm20nOGoY4V6AQvbrWtE1y0PmJL5eVgCiaH7ocDG',
        isMain: true,
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm20uuZBSoqhHaOQDNj0TFUWCtSdR3IvyPsLglqV',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm20I6QJH5P84oFAdzqKZIejtTO6rGUMbvJNngQu',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm20KfoOVGaIMCrcdJ4VUw6ZNsDR3EbF7qe58SLP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm2076fNrfZf6sKu1eoZqY2lha8nREHJrbW3QTMP',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm20Q2Q5otdy6YcuXHVw0jdemTr5lOQsIfMpCZAz',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
      {
        url: 'ZPESD8WLdm20eHcwIHgwpCF9B6lOWvzMuSRDfIj5V8Lhe4Tt',
        productId: Xiaomi14T.id,
        variantId: Xiaomi14T_VARIANT8.id,
      },
    ],
  });
}
