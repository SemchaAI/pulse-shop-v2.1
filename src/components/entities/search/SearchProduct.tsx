import Image from 'next/image';
import type { ISearchProductVariant } from '@/models/prisma';
import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface IProps {
  product: ISearchProductVariant;
  index: number;
  onClick: () => void;
}

export const SearchProduct = ({ product, index, onClick }: IProps) => {
  return (
    <li
      key={product.id}
      className="flex items-center justify-between gap-2 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 100}ms`, // Delay each item
        animationFillMode: 'forwards',
      }}
    >
      <Link
        onClick={onClick}
        href={`/product/${product.slug}`}
      >
        <Image
          src={`${NEXT_PUBLIC_IMAGES_HOST}${product.images[0].url}`}
          alt={product.name}
          width={100}
          height={100}
          className="md:w-36 md:h-36 rounded-2xl bg-foreground transition-transform hover:scale-105 focus:scale-105"
        />
      </Link>
      <div className="flex flex-col text-text-highlight">
        <Link
          className="typo-body-16 text-pretty transition-colors hover:text-primary focus:text-primary"
          onClick={onClick}
          href={`/product/${product.slug}`}
        >
          {product.name}
        </Link>
        <p className="flex gap-1 items-center typo-body-16">
          Rate: {product.totalRating}
          <Star
            className="text-primary"
            size={16}
          />
        </p>
      </div>
      <div className="h-4 grow hidden sm:block border-b border-border border-dashed"></div>
      <p className="typo-body-14 text-text-highlight">{product.price} MDL</p>
    </li>
  );
};
