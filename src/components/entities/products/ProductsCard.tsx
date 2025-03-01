import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { AddToCard, ToggleFavorite } from '@/components/features';
import { StarRating } from '@/components/features/starRating/StarRating';
import { SaleBadge } from '@/components/shared';
import { ISearchProductVariant } from '@/models/prisma';
import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts/env';

interface IProps {
  variant: ISearchProductVariant;
  isPriority: boolean;
}

const Card = ({ variant, isPriority }: IProps) => {
  //stock slug
  const { id, name, totalRating, images, oldPrice, price, slug } = variant;
  const url = NEXT_PUBLIC_IMAGES_HOST + images[0].url || '/images/noImage.webp';
  return (
    <li
      key={id}
      className="h-full flex flex-col p-4 justify-between relative bg-foreground border border-border rounded-lg overflow-hidden"
    >
      <Link href={`/product/${slug}`}>
        <Image
          className="flex m-auto transition-transform duration-300 hover:scale-105 focus:scale-105"
          alt=""
          src={url}
          width={200}
          height={200}
          priority={isPriority}
          loading={isPriority ? 'eager' : 'lazy'}
        />
        <h4 className="typo-body-16 font-semibold line-clamp-3 hover:text-primary focus:text-primary">
          {name}
        </h4>
      </Link>
      <div className="flex-1 flex flex-col justify-end">
        <div className="w-full flex justify-between">
          <p>Rating:</p>
          <StarRating
            size={18}
            rating={totalRating}
          />
        </div>
        <div className="w-full flex flex-col justify-end h-12">
          {oldPrice && (
            <div className="flex gap-1 items-center">
              <SaleBadge
                oldPrice={oldPrice}
                price={price}
              />
              <span className="line-through typo-body-14">{oldPrice} MDL</span>
            </div>
          )}
          <p className="line-clamp-1">Price: {price} MDL</p>
        </div>
      </div>
      <div className="flex gap-2">
        <AddToCard
          id={id}
          stock={variant.stock}
        />
        <ToggleFavorite id={id} />
      </div>
    </li>
  );
};
export const ProductsCard = memo(Card);
