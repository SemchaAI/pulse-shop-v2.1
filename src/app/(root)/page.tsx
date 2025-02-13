import { ProductsCarouselSection } from '@/components/widgets';
import type { ICategory } from '@/models/prisma';
import { prisma } from '@/prisma/prismaClient';

async function getProducts() {
  // const products = await prisma.productItem.findMany();
  const categories: ICategory[] = await prisma.category.findMany({
    include: {
      products: {
        include: {
          images: {
            take: 1,
            where: {
              isMain: true,
            },
          },
          variants: {
            take: 1,
          },
        },
        take: 10,
      },
    },
  });
  return (
    <>
      {categories.map((category) => {
        if (category.products.length > 0) {
          return (
            <ProductsCarouselSection
              key={category.id}
              category={category}
            />
          );
        }
      })}
    </>
  );
}
export default async function Home() {
  const products = await getProducts();
  return products;
}
