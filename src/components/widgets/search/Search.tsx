'use client';
import { useState } from 'react';
import { SearchIcon, Trash2, X } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { search } from '@/app/(root)/categories/[slug]/api';
import { Button, Container, Input, Overlay } from '@/components/shared';
import { SearchProduct } from '@/components/entities';
import { queryKeys } from '@/utils/consts';
import { useScrollControl } from '@/utils/hooks';
import useDebounce from '@/utils/hooks/useDebounce';

import type { ISearchProductVariant } from '@/models/prisma';

export const Search = () => {
  const [focused, setFocused] = useState(false);
  useScrollControl(focused);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ISearchProductVariant[]>([]);
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.products, query],
    mutationFn: () => search(`name=${query}`),
    onSuccess: (data) => setProducts(data.data),
    throwOnError: notFound,
  });
  useDebounce(
    () => {
      if (!focused) return;
      const search = async () => {
        try {
          if (!query) return;
          mutate();
        } catch (error) {
          // toast.error('Search error');
          console.log('[SEARCH ERROR]', error);
        }
      };
      search();
    },
    700,
    [query, focused]
  );
  const CloseHandler = () => {
    setFocused((prev) => !prev);
    setQuery('');
    setProducts([]);
  };

  const RefreshClick = () => {
    setQuery('');
    setProducts([]);
  };

  return (
    <>
      <button
        aria-label="search products"
        type="button"
        className="w-6 flex"
        onClick={CloseHandler}
      >
        <SearchIcon size={24} />
      </button>
      <div
        className={`transition-all fixed top-0 left-0 z-30
         flex items-center justify-center w-full overflow-hidden
         bg-background rounded-b-xl ${focused ? 'h-[65px]' : 'h-0'}`}
      >
        <Container>
          <div className="flex items-center gap-4">
            <div className="min-w-80 grow relative z-20">
              <SearchIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                type="text"
                placeholder="Search..."
                rounded
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
              <Trash2
                size={20}
                onClick={RefreshClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            <Button
              aria-label="close search"
              icon
              version="contain"
              onClick={() => setFocused(false)}
              className="p-[2px]"
            >
              <X size={24} />
            </Button>
          </div>
        </Container>
      </div>
      {focused && (
        <div
          className={`fixed top-[85px] left-0 z-30 w-full ${
            isPending ? 'animate-pulse' : ''
          }`}
        >
          <Container>
            <ul className="transition-all flex flex-col gap-2 bg-background rounded-xl p-5">
              {products.length === 0 && query && (
                <p className="flex gap-5 items-center justify-center typo-body-16">
                  No results found <SearchIcon size={24} />
                </p>
              )}
              {products.length === 0 && !query && (
                <p className="flex gap-5 items-center justify-center typo-body-16">
                  Search for products <SearchIcon size={24} />
                </p>
              )}
              {products.length > 0 &&
                products.slice(0, 3).map((product, i) => (
                  <SearchProduct
                    key={product.id}
                    product={product}
                    index={i}
                    onClick={CloseHandler}
                  />
                ))}
            </ul>
          </Container>
        </div>
      )}
      {focused && <Overlay onClick={() => setFocused(false)} />}
    </>
  );
};
