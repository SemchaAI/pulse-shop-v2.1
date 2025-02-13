import { prisma } from '../prismaClient';
import { ISeedProps } from '../seed';

export async function Poco({
  categories,
  colors,
  memory,
  ram,
  tags,
}: ISeedProps) {
  const POCO_C65 = await prisma.product.create({
    data: {
      description:
        'Discover the world of mobile technology with the new POCO C65 from Xiaomi, the perfect combination of performance, style and innovation. This smartphone embodies everything you need for communication, entertainment and work. It offers you flawless picture quality on a 6.74-inch IPS LCD display with a 90Hz refresh rate and 720 x 1600 pixel resolution, making every moment smooth and vivid.',
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
  const POCO_C65_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'POCO C65 8GB/128GB Black',
      slug: 'poco-c65-8gb-128gb-black',
      productId: POCO_C65.id,
      stock: 5,
      price: 3099,
      colorId: colors.Black.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const POCO_C65_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'POCO C65 8GB/256GB Black',
      slug: 'poco-c65-8gb-256gb-black',
      productId: POCO_C65.id,
      stock: 5,
      price: 3499,
      colorId: colors.Black.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const POCO_C65_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'POCO C65 8GB/128GB Blue',
      slug: 'poco-c65-8gb-128gb-blue',
      productId: POCO_C65.id,
      stock: 5,
      price: 3099,
      colorId: colors.Blue.id,
      memoryId: memory.Memory128GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const POCO_C65_VARIANT4 = await prisma.productVariant.create({
    data: {
      name: 'POCO C65 8GB/256GB Blue',
      slug: 'poco-c65-8gb-256gb-blue',
      productId: POCO_C65.id,
      stock: 5,
      price: 3499,
      colorId: colors.Blue.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_C65_IMG1 = await prisma.image.createMany({
    data: [
      {
        url: '541ec2ed-a21e-4657-b512-ff751bf18453-tts8fo.webp',
        isMain: true,
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT1.id,
      },
      {
        url: '6b9df479-9231-4940-89cf-706baf5dd3ba-msblyf.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT1.id,
      },
      {
        url: 'e9e3f215-ca96-4f45-bdba-fd9e76e3d5aa-msblye.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT1.id,
      },
      {
        url: 'a6217ec8-995a-4886-beb8-ec6e0877ee1c-msblyd.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_C65_IMG2 = await prisma.image.createMany({
    data: [
      {
        url: '541ec2ed-a21e-4657-b512-ff751bf18453-tts8fo.webp',
        isMain: true,
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT2.id,
      },
      {
        url: '6b9df479-9231-4940-89cf-706baf5dd3ba-msblyf.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT2.id,
      },
      {
        url: 'e9e3f215-ca96-4f45-bdba-fd9e76e3d5aa-msblye.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT2.id,
      },
      {
        url: 'a6217ec8-995a-4886-beb8-ec6e0877ee1c-msblyd.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_C65_IMG3 = await prisma.image.createMany({
    data: [
      {
        url: 'e0e2b184-29fe-420d-a88f-5491a3859d82-hstxl9.webp',
        isMain: true,
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT3.id,
      },
      {
        url: 'fb153d1b-b811-40a6-87dc-3a19b33b25bb-d070qe.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT3.id,
      },
      {
        url: '553a96d0-08c3-4b2c-b2b7-feca222bfd2f-d070qd.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT3.id,
      },
      {
        url: 'fcf8a5f6-7f28-43ea-bcbe-7d8682e3d577-d070qc.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT3.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_C65_IMG4 = await prisma.image.createMany({
    data: [
      {
        url: 'e0e2b184-29fe-420d-a88f-5491a3859d82-hstxl9.webp',
        isMain: true,
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT4.id,
      },
      {
        url: 'fb153d1b-b811-40a6-87dc-3a19b33b25bb-d070qe.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT4.id,
      },
      {
        url: '553a96d0-08c3-4b2c-b2b7-feca222bfd2f-d070qd.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT4.id,
      },
      {
        url: 'fcf8a5f6-7f28-43ea-bcbe-7d8682e3d577-d070qc.webp',
        productId: POCO_C65.id,
        variantId: POCO_C65_VARIANT4.id,
      },
    ],
  });

  const POCO_X6 = await prisma.product.create({
    data: {
      description:
        'A smartphone that embodies power and style, designed for those who value high technology and quality. With a light weight of just 181g and a slim body measuring 161.2 x 74.3 x 8mm, this smartphone fits easily into your pocket or bag while offering impeccable performance and ease of use.',
      categoryId: categories.SmartphonesCategory.id,
      tags: {
        connect: [
          { id: tags.XiaomiTag.id },
          { id: tags.MidRangeTag.id },
          { id: tags.Autumn2023Tag.id },
        ],
      },
      ProductInfo: {
        createMany: {
          data: [
            { title: 'Brand', description: 'Xiaomi' },
            {
              title: 'Weight',
              description: '181g',
            },
            {
              title: 'Display Type',
              description: 'Amoled',
            },
            {
              title: 'Display Size',
              description: '6.74"',
            },
            {
              title: 'Display Resolution',
              description: '2712 x 1220 pixels',
            },
            {
              title: 'Display Refresh Rate',
              description: '120Hz',
            },
          ],
        },
      },
    },
  });

  const POCO_X6_VARIANT1 = await prisma.productVariant.create({
    data: {
      name: 'Poco X6 8GB/256GB Black',
      slug: 'poco-x6-8gb-256gb-black',
      productId: POCO_X6.id,
      stock: 5,
      price: 6099,
      colorId: colors.Black.id,
      memoryId: memory.Memory256GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const POCO_X6_VARIANT2 = await prisma.productVariant.create({
    data: {
      name: 'Poco X6 8GB/512GB Black',
      slug: 'poco-x6-8gb-512gb-black',
      productId: POCO_X6.id,
      stock: 5,
      price: 6499,
      colorId: colors.Black.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM8GB.id,
    },
  });
  const POCO_X6_VARIANT3 = await prisma.productVariant.create({
    data: {
      name: 'Poco X6 12GB/512GB Black',
      slug: 'poco-x6-12gb-512gb-black',
      productId: POCO_X6.id,
      stock: 5,
      price: 6999,
      colorId: colors.Black.id,
      memoryId: memory.Memory512GB.id,
      ramId: ram.RAM12GB.id,
    },
  });
  const POCO_X6_VARIANT4 = await prisma.productVariant.create({
    data: {
      name: 'Poco X6 12GB/1TB Black',
      slug: 'poco-x6-12gb-1tb-black',
      productId: POCO_X6.id,
      stock: 5,
      price: 6999,
      colorId: colors.Black.id,
      memoryId: memory.Memory1TB.id,
      ramId: ram.RAM12GB.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_X6_IMG_VARIANT1 = await prisma.image.createMany({
    data: [
      {
        url: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
        isMain: true,
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: 'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: 'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: 'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: 'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
      {
        url: '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT1.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_X6_IMG_VARIANT2 = await prisma.image.createMany({
    data: [
      {
        url: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
        isMain: true,
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: 'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: 'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: 'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: 'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
      {
        url: '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT2.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_X6_IMG_VARIANT3 = await prisma.image.createMany({
    data: [
      {
        url: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
        isMain: true,
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: 'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: 'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: 'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: 'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
      {
        url: '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT3.id,
      },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POCO_X6_IMG_VARIANT4 = await prisma.image.createMany({
    data: [
      {
        url: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
        isMain: true,
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: 'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: 'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: 'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: 'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
      {
        url: '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
        productId: POCO_X6.id,
        variantId: POCO_X6_VARIANT4.id,
      },
    ],
  });
}
