'use client';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  useFilters,
  useGetFilters,
  useQueryFilters,
  useScrollControl,
} from '@/utils/hooks';

import { Button } from '@/components/shared';
import { FilterWrapper } from '@/components/entities';
import { CheckboxGroupFilter, PriceFilter } from '@/components/features';

export const Filters = () => {
  console.log('Filters');
  const [mobile, setMobile] = useState(false);
  useScrollControl(mobile);

  const { slug } = useParams<{ slug: string }>();
  const { colors, memory, ram, isLoading } = useGetFilters(slug);
  const filters = useFilters();
  useQueryFilters(filters);

  return (
    <aside className="min-w-[300px] p-4 border-r border-border">
      <div className="flex justify-between items-center mb-4">
        <p className="typo-title-24">Filters</p>
        <div className="md:hidden">
          <Button
            icon
            version="contain"
            onClick={() => setMobile(true)}
          >
            <Filter />
          </Button>
        </div>
      </div>
      <div
        className={`${
          mobile ? 'fixed inset-0 z-50 bg-card p-4' : ''
        } hidden md:block transition-transform`}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4 md:hidden">
          <p className="text-2xl font-bold">Filters</p>
          <Button
            icon
            version="contain"
            onClick={() => setMobile(false)}
          >
            <X />
          </Button>
        </div>

        <FilterWrapper
          title="Prices"
          isLoading={isLoading}
        >
          <PriceFilter
            min={0}
            max={100000}
            paramKeys={{ paramFrom: 'priceFrom', paramTo: 'priceTo' }}
            step={1000}
          />
        </FilterWrapper>
        <FilterWrapper
          title="Colors"
          isLoading={isLoading}
        >
          <CheckboxGroupFilter
            items={colors}
            selected={filters.colors}
            onClickCheckbox={filters.toggleColor}
          />
        </FilterWrapper>
        <FilterWrapper
          title="Ram"
          isLoading={isLoading}
        >
          <CheckboxGroupFilter
            items={ram}
            selected={filters.ram}
            onClickCheckbox={filters.toggleRam}
          />
        </FilterWrapper>
        <FilterWrapper
          title="Memory"
          isLoading={isLoading}
        >
          <CheckboxGroupFilter
            items={memory}
            selected={filters.memory}
            onClickCheckbox={filters.toggleMemory}
          />
        </FilterWrapper>
      </div>
    </aside>
  );
};

/* <PricesFilter
  title="Prices"
  isLoading={isLoading}
/>
<CheckboxFilter
  title="Colors"
  items={colors}
  selected={filters.colors}
  onClickCheckbox={filters.toggleColor}
  isLoading={isLoading}
/>
<CheckboxFilter
  title="Ram"
  items={ram}
  selected={filters.ram}
  onClickCheckbox={filters.toggleRam}
  isLoading={isLoading}
/>
<CheckboxFilter
  title="Memory"
  items={memory}
  selected={filters.memory}
  onClickCheckbox={filters.toggleMemory}
  isLoading={isLoading}
/> */

/* <PriceFilter
  min={0}
  max={100000}
  step={1000}
  paramKeys={{
    paramFrom: 'priceFrom',
    paramTo: 'priceTo',
  }}
/> */

/* <CheckboxGroup
  title="Colors"
  items={colors}
  defaultItems={colors.slice(0, limit)}
  limit={limit}
  loading={isLoading}
  selected={filters.colors}
  onClickCheckbox={filters.toggleColor}
  searchInputPlaceholder="Search..."
/>
<CheckboxGroup
  title="Memory"
  items={memory}
  defaultItems={memory.slice(0, limit)}
  limit={limit}
  loading={isLoading}
  selected={filters.memory}
  onClickCheckbox={filters.toggleMemory}
  searchInputPlaceholder="Search..."
/>
<CheckboxGroup
  title="Ram"
  items={ram}
  defaultItems={ram.slice(0, limit)}
  limit={limit}
  loading={isLoading}
  selected={filters.ram}
  onClickCheckbox={filters.toggleRam}
  searchInputPlaceholder="Search..."
/> */
