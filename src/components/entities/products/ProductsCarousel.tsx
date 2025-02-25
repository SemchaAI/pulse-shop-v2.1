'use client';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductsCard } from '@/components/entities';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/features';

import type { ISearchProductVariant } from '@/models/prisma';
import { memo } from 'react';

type PropType = {
  products: ISearchProductVariant[];
  options?: EmblaOptionsType;
};

export const ProductsCarousel: React.FC<PropType> = memo(
  ({
    products,
    options = { align: 'center', slidesToScroll: 'auto' } as EmblaOptionsType,
  }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
      <div className="m-auto w-full relative">
        <div
          className="overflow-hidden"
          ref={emblaRef}
        >
          {/* -ml-4  pl-4 need to be as our main container px-[4px] sm:px-[8px] lg:px-[16px]*/}
          <div className="flex touch-pan-y touch-pinch-zoom -ml-1 sm:-ml-2 lg:-ml-4">
            {products.map((product, i) => {
              return (
                <ul
                  className="transform-gpu min-w-0 pl-1 sm:pl-2 lg:pl-4
                  flex-shrink-0 flex-grow-0 
                  basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  key={product.id}
                >
                  <ProductsCard
                    isPriority={i < 8}
                    variant={product}
                  />
                </ul>
              );
            })}
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
  }
);

ProductsCarousel.displayName = 'ProductsCarousel';
