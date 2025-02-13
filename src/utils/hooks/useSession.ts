'use client';
import { useQuery } from '@tanstack/react-query';
import type { IUserSession } from '@/models/auth';
import { getSession } from '../api';
import { queryKeys } from '@/utils/consts';

type UseSessionReturn = {
  data: IUserSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};
export const useSession = (): UseSessionReturn => {
  const { data, status } = useQuery({
    queryKey: [queryKeys.session],
    queryFn: getSession,
    //staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
  });

  return {
    data: data ?? null,
    status:
      status === 'pending'
        ? 'loading'
        : data
        ? 'authenticated'
        : 'unauthenticated',
  };
};
