'use client';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductsCard } from '@/components/entities';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/features';

import type { IProduct } from '@/models/prisma';
import type { ProductItem } from '@prisma/client';

type PropType = {
  products: IProduct[];
  options?: EmblaOptionsType;
};

export const ProductsCarousel: React.FC<PropType> = (props) => {
  const { products, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative m-auto max-w-custom-xl w-full">
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex backface-hidden touch-pan-y gap-4 my-1">
          {products.map((product) =>
            product.productItem.map((productItem: ProductItem) => {
              return (
                <ProductsCard
                  key={productItem.id}
                  productItem={productItem}
                  product={product}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="absolute right-0 left-0 top-[calc(50%-17.5px)] flex justify-between items-center pointer-events-none">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};
