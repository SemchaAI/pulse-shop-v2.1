'use client';
import { useState } from 'react';
import { Checkbox, Input } from '@/components/shared';

import type { ICheckbox } from '@/models/inputs';
interface Item extends ICheckbox {
  _count: { productVariant: number };
}

interface IProps {
  items: Item[];
  searchPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  selected?: Set<string>;
}

export const CheckboxGroupFilter = ({
  items,
  searchPlaceholder = 'Search...',
  onClickCheckbox,
  selected,
}: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const list = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      {list.length > 5 && (
        <div className="mb-5">
          <Input
            type="text"
            rounded
            onChange={onChangeSearch}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-scroll custom-scrollbar">
        {list.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            name={item.name}
            endAdornment={
              <span className="text-text-secondary p-1 rounded bg-foreground aspect-square select-none">
                {item._count.productVariant}
              </span>
            }
            checked={selected?.has(item.id.toString())}
            onChange={() => onClickCheckbox?.(item.id.toString())}
          />
        ))}
      </div>
    </>
  );
};
