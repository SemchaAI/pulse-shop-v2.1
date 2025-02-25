'use client';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { ProductsSection } from '@/components/widgets';

import { queryKeys } from '@/utils/consts';
import { getFavorite } from '@/utils/api/http/favoriteApi';
import { useAppSelector } from '@/utils/hooks';

export const FavoriteProducts = () => {
  const favorite = useAppSelector((state) => state.favorite);
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.favorite],
    queryFn: getFavorite,
    throwOnError: notFound,
  });

  return (
    <div className="w-full flex flex-col justify-between gap-5 py-4">
      <ProductsSection
        isLoading={isLoading}
        category="Favorites"
        skeletons={4}
        withPriority={8}
        products={
          data?.favoriteProducts.filter((product) =>
            favorite.favoriteProducts.includes(product.id)
          ) || []
        }
      />
    </div>
  );
};
