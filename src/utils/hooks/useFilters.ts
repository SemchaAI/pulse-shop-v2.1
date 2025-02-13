'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from './useSet';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
export interface Filters {
  memory: Set<string>;
  ram: Set<string>;
  colors: Set<string>;
  prices: PriceProps;
}

export interface ReturnFilterProps extends Filters {
  toggleColor: (id: string) => void;
  toggleMemory: (id: string) => void;
  toggleRam: (id: string) => void;
  updatePrice: (name: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnFilterProps => {
  const searchParams = useSearchParams();

  //prices------------------------------------
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    // if (!prices.priceTo || !prices.priceFrom) return;
    if (value < 0) return;
    if (prices.priceTo && name === 'priceFrom' && value > prices.priceTo) {
      return;
    }
    if (prices.priceFrom && name === 'priceTo' && value < prices.priceFrom) {
      return;
    }
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //colors------------------------------------
  const [colors, { toggle: toggleColor }] = useSet(
    new Set<string>(
      searchParams.has('colors') ? searchParams.get('colors')?.split(',') : []
    )
  );
  //memory------------------------------------
  const [memory, { toggle: toggleMemory }] = useSet(
    new Set<string>(
      searchParams.has('memory') ? searchParams.get('memory')?.split(',') : []
    )
  );
  //ram---------------------------------------
  const [ram, { toggle: toggleRam }] = useSet(
    new Set<string>(
      searchParams.has('ram') ? searchParams.get('ram')?.split(',') : []
    )
  );

  return useMemo(
    () => ({
      prices,
      colors,
      memory,
      ram,
      toggleMemory,
      toggleRam,
      toggleColor,
      updatePrice,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prices, colors, memory, ram]
  );
};
