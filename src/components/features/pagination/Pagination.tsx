'use client';
import { memo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button, Skeleton } from '@/components/shared';
import type { PaginationMeta } from '@/models/api';
import { formUrlQuery } from '@/utils/helpers';

interface IProps extends Pick<PaginationMeta, 'lastPage' | 'currentPage'> {
  isLoading: boolean;
}

export const Pagination = memo(
  ({ currentPage, lastPage, isLoading }: IProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const prevPages = Array.from(
      { length: Math.min(2, currentPage - 1) },
      (_, idx) => currentPage - idx - 1
    ).reverse();

    const nextPages = Array.from(
      { length: Math.min(2, lastPage - currentPage) },
      (_, idx) => currentPage + idx + 1
    );

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= lastPage) {
        const newUrl = formUrlQuery({
          key: 'page',
          value: page.toString(),
          params: searchParams.toString(),
        });
        router.replace(newUrl, { scroll: false });
      }
    };

    if (isLoading)
      return (
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <Skeleton
            width="30%"
            height="42px"
            borderRadius="42px"
          />
        </div>
      );
    if (lastPage <= 1)
      return (
        <div className="flex gap-2 flex-wrap justify-center items-center h-[42px]" />
      );

    return (
      lastPage > 1 && (
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <Button
            icon={true}
            version="contain"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft />
          </Button>
          <Button
            icon={true}
            version="contain"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft />
          </Button>
          {prevPages.map((page) => (
            <Button
              key={page}
              version="outline"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button version="contain">{currentPage}</Button>
          {nextPages.map((page) => (
            <Button
              key={page}
              version="outline"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            icon={true}
            version="contain"
            disabled={currentPage === lastPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            icon={true}
            version="contain"
            disabled={currentPage === lastPage}
            onClick={() => handlePageChange(lastPage)}
          >
            <ChevronsRight />
          </Button>
        </div>
      )
    );
  }
);
Pagination.displayName = 'Pagination';
