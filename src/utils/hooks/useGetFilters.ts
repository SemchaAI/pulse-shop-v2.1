'use client';
import { Color, Memory, Ram } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES, queryKeys } from '../consts';
import type { TCountedType } from '@/models/api';

type CountedColor = TCountedType<Color>;
type CountedMemory = TCountedType<Memory>;
type CountedRam = TCountedType<Ram>;

interface IReturnProps {
  memory: CountedMemory[];
  colors: CountedColor[];
  ram: CountedRam[];
}

export const useGetFilters = (slug: string) => {
  const fetchFilters = async (): Promise<IReturnProps> => {
    const res = await fetch(`${API_ROUTES.FILTERS}?category=${slug}`);
    if (!res.ok) throw new Error('Failed to fetch filters');
    const data = await res.json();
    return data;
  };

  const { data, isLoading, error } = useQuery<IReturnProps>({
    queryKey: [queryKeys.filters],
    queryFn: fetchFilters,
  });

  return {
    colors: data?.colors || [],
    memory: data?.memory || [],
    ram: data?.ram || [],
    isLoading,
    error,
  };
};
