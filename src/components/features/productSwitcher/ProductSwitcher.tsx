import type { Variant } from '@/app/(root)/product/[slug]/getProductAction';
import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  isColor?: boolean;
  type: 'ram' | 'color' | 'memory';
  variants: Variant[];
  currentVariant: Variant;
}

export const ProductSwitcher = ({
  variants,
  currentVariant,
  type,
  isColor = false,
}: IProps) => {
  const keyId = `${type}Id` as keyof Variant;
  return (
    variants.length && (
      <>
        <h3 className="flex items-center gap-1 typo-body-16  capitalize">
          {type}:
          <span className="text-text-highlight text-lg font-bold">
            {currentVariant[type]?.name}
          </span>
        </h3>
        <ul className="flex gap-2 flex-wrap">
          {variants.map(
            (item) =>
              item[type] && (
                <li
                  key={item.id}
                  className="flex gap-2 justify-start "
                >
                  <Link
                    className={`${
                      currentVariant[keyId] === item[keyId]
                        ? 'pointer-events-none'
                        : ''
                    } `}
                    // ${item.stock === 0 ? 'opacity-50' : ''}`}
                    href={`/product/${item.slug}`}
                  >
                    {isColor ? (
                      <Image
                        className={`border ${
                          currentVariant.colorId === item.colorId
                            ? 'border-primary'
                            : ''
                        } rounded-lg transition duration-300 p-0.5 h-16 w-16 hover:border-primary`}
                        src={NEXT_PUBLIC_IMAGES_HOST + item.images[0].url}
                        alt={item.name}
                        width={56}
                        height={56}
                      />
                    ) : (
                      <div
                        className={`border ${
                          currentVariant[keyId] === item[keyId]
                            ? 'border-primary'
                            : ''
                        } rounded-full transition duration-300 p-1.5 hover:border-primary`}
                      >
                        {item[type].name}
                      </div>
                    )}
                  </Link>
                </li>
              )
          )}
        </ul>
      </>
    )
  );
};
