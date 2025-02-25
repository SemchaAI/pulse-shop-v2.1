import { prisma } from '@/prisma/prismaClient';
import { unstable_cache } from 'next/cache';
import { ProductsCarouselSection } from '@/components/widgets';
import { LazyLoadWrapper } from '@/components/features';
import { ProductCardSkeleton } from '@/components/entities';
import { Skeleton } from '@/components/shared';

const getCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            images: { take: 1, where: { isMain: true } },
            variants: { take: 1 },
          },
          take: 10,
        },
      },
    });
    return categories.map((category) => ({
      ...category,
      products: category.products
        .map((product) => {
          const firstVariant = product.variants[0];
          return firstVariant
            ? { ...firstVariant, images: product.images }
            : null;
        })
        .filter((product) => product !== null),
    }));
  },
  ['categories'], // Cache key
  { revalidate: 60 } // ISR: Revalidate every 60 seconds
);

export default async function Home() {
  const categories = await getCategories();
  let productCount = 0;
  return (
    <>
      {categories.map((category) => {
        if (category.products.length === 0) return null;
        productCount++;
        return productCount <= 2 ? (
          <ProductsCarouselSection
            key={category.id}
            category={category.name}
            products={category.products}
          />
        ) : (
          <LazyLoadWrapper
            key={category.id}
            threshold={0.2}
            skeleton={
              //TMP section skeleton need
              <div className="my-3 flex flex-col gap-2">
                <div className="h-9">
                  <Skeleton
                    width="150px"
                    height="100%"
                    borderRadius="10px"
                  />
                </div>
                <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </ul>
              </div>
            }
          >
            <ProductsCarouselSection
              category={category.name}
              products={category.products}
            />
          </LazyLoadWrapper>
        );
      })}
    </>
  );
}
