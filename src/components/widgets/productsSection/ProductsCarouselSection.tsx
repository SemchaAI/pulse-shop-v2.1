import { ProductsCarousel } from '@/components/entities';
import { Container } from '@/components/shared';
import type { ICategory } from '@/models/prisma';
import Link from 'next/link';

interface IProps {
  category: ICategory;
}

export const ProductsCarouselSection = ({ category }: IProps) => {
  if (!category.products || !category.products.length) {
    return null;
  }
  const products = category.products
    .map((product) => {
      const [firstVariant] = product.variants;
      return firstVariant ? { ...firstVariant, images: product.images } : null;
    })
    .filter((product) => product !== null);

  return (
    <section className="my-3">
      <Container>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h3 className="typo-title-30">{category.name}</h3>
            <Link
              className="text-primary"
              href={`/categories/${category.name.toLowerCase()}`}
            >
              View All
            </Link>
          </div>
          <ProductsCarousel
            products={products}
            options={{ align: 'start' }}
          />
        </div>
      </Container>
    </section>
  );
};
