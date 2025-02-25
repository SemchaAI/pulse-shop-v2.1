import Link from 'next/link';

import { ProductsCarousel } from '@/components/entities';
import { Container } from '@/components/shared';
import type { ISearchProductVariant } from '@/models/prisma';

interface IProps {
  products: ISearchProductVariant[];
  category: string;
}

export const ProductsCarouselSection = ({ category, products }: IProps) => {
  if (!category || !category.length) {
    return null;
  }
  return (
    <section className="my-3">
      <Container>
        <div className="flex justify-between items-center">
          <h3 className="typo-title-30">{category}</h3>
          <Link
            className="text-primary"
            href={`/categories/${category.toLowerCase()}`}
          >
            View All
          </Link>
        </div>
        <ProductsCarousel products={products} />
      </Container>
    </section>
  );
};
