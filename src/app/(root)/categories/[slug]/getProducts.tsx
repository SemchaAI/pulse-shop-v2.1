'use client';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { ProductsSection } from '@/components/widgets';
import { search } from './api';
import { queryKeys } from '@/utils/consts';
import { Pagination } from '@/components/features';

export const Products = () => {
  const params = useSearchParams();
  const { slug } = useParams<{ slug: string }>();
  const queryParams = Object.fromEntries(params.entries());
  if (typeof slug === 'string' && slug !== 'all') queryParams.category = slug;

  const query = qs.stringify(queryParams, {
    arrayFormat: 'comma',
  });

  const {
    data: queryData = {
      data: [],
      meta: { total: 0, currentPage: 1, perPage: 9, lastPage: 0 },
    },
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.products, query],
    queryFn: () => search(query),
    throwOnError: notFound,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
  });

  const { data, meta } = queryData;
  return (
    <div className="w-full flex flex-col justify-between gap-5 py-4">
      {data.length > 0 && (
        <ProductsSection
          isLoading={isLoading}
          category={slug !== 'all' ? slug : 'All Products'}
          products={data}
        />
      )}
      <Pagination
        isLoading={isLoading}
        lastPage={meta.lastPage}
        currentPage={meta.currentPage}
      />
    </div>
  );
};
