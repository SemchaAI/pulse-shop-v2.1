import { CartQuantityControl, CartRemoveControl } from '@/components/features';
import { SaleBadge } from '@/components/shared';
import type { IFlatProduct } from '@/models/cart';
import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface IProps {
  item: IFlatProduct & { disabled?: boolean };
  index: number;
}

export const CartProduct = memo(({ item, index }: IProps) => {
  console.log('CartProduct');
  return (
    <li
      className={`w-full p-2 md:p-5 flex gap-2 justify-between items-center relative border border-border rounded-lg bg-background
      ${false ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="flex flex-col sm:flex-row gap-2 grow">
        <Link
          className="m-auto"
          href={`/product/${item.slug}`}
        >
          <Image
            className="lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] aspect-square object-cover transition-transform hover:scale-105 focus:scale-105"
            priority={index > 1 ? false : true}
            width={100}
            height={100}
            sizes="(max-width: 768px) 150px,(max-width: 375px) 100px,200px"
            src={NEXT_PUBLIC_IMAGES_HOST + item.img}
            alt={item.name}
          />
        </Link>
        <div className="flex grow flex-col xl:flex-row justify-center sm: xl:items-center gap-4">
          <div className="flex flex-col">
            <h3 className="text-pretty">{item.name}</h3>
            <div className="flex gap-2">
              <span>In stock:</span>
              {item.stock}
            </div>
            <div className="flex flex-col">
              {item.oldPrice && (
                <div className="flex gap-1 items-center">
                  <SaleBadge
                    oldPrice={item.oldPrice}
                    price={item.price}
                  />
                  <span className="line-through typo-">
                    {item.oldPrice} MDL
                  </span>
                </div>
              )}
              <div>
                <span className="typo-body-16">Price:</span>
                <span>{item.price} MDL</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center sm:justify-start">
            <CartQuantityControl item={item} />
          </div>
        </div>
      </div>
      <div className="absolute top-2 left-2 sm:static sm:top-0 sm:left-0">
        <CartRemoveControl item={item} />
      </div>
    </li>
  );
});

CartProduct.displayName = 'CartProduct';
