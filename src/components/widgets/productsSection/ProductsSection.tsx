import { ProductCardSkeleton, ProductsCard } from '@/components/entities';
import type { ISearchProductVariant } from '@/models/prisma';

interface IProps {
  category: string;
  products: ISearchProductVariant[];
  isLoading: boolean;
  withPriority?: number;
  skeletons?: number;
}

export const ProductsSection = ({
  category,
  products,
  isLoading,
  withPriority = 4,
  skeletons = 4,
}: IProps) => {
  return (
    <section className="flex flex-col gap-5 overflow-hidden">
      <h3 className="typo-title-24 capitalize">{category}</h3>
      <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: skeletons }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product, i) => (
              <ProductsCard
                key={product.id}
                variant={product}
                isPriority={i < withPriority}
              />
            ))}
      </ul>
    </section>
  );
};
