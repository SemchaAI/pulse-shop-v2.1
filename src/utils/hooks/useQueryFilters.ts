import { useEffect, useRef } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';

import { Filters } from './useFilters';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        memory: Array.from(filters.memory),
        ram: Array.from(filters.ram),
        colors: Array.from(filters.colors),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });
      router.replace(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters, router]);
};
