import { ProductCardSkeleton, ProductsCard } from '@/components/entities';
import type { IProductVariant } from '@/models/prisma';

interface IProps {
  category: string;
  products: IProductVariant[];
  isLoading: boolean;
}

export const ProductsSection = ({ category, products, isLoading }: IProps) => {
  console.log('products', products);
  return (
    <section className="flex flex-col gap-5">
      <h3 className="typo-title-24 capitalize">{category}</h3>
      <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product, i) => (
              <li key={product.id}>
                <ProductsCard
                  variant={product}
                  isPriority={i < 8}
                />
              </li>
            ))}
      </ul>
    </section>
  );
};
