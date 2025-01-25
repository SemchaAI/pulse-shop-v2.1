import { ProductsSection } from '@/components/widgets';
import type { ICategory } from '@/models/prisma';
import { prisma } from '@/prisma/prismaClient';

async function getProducts() {
  // const products = await prisma.productItem.findMany();
  const categories: ICategory[] = await prisma.category.findMany({
    include: {
      products: {
        include: {
          productItem: {
            orderBy: {
              id: 'desc',
            },
            // where: {
            //   colorId: { in: colors },
            //   memoryId: { in: memory },
            //   ramId: { in: ram },
            //   price: { gte: priceFrom, lte: priceTo },
            // },
          },
        },
      },
    },
  });
  return (
    <>
      {categories.map((category) => (
        <ProductsSection
          key={category.id}
          category={category}
        />
      ))}
    </>
  );
}
export default async function Home() {
  const products = await getProducts();
  return <>{products}</>;
}
