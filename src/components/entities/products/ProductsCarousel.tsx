'use client';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductsCard } from '@/components/entities';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/features';

import type { IProductVariant } from '@/models/prisma';

type PropType = {
  products: IProductVariant[];
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
          {products.map((product, i) => {
            return (
              <div
                className="h-auto transform translate-x-0 min-w-0 flex-shrink-0 flex-grow-0 basis-[80%] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.33%-0.66rem)] lg:basis-[calc(25%-0.75rem)]"
                key={product.id}
              >
                <ProductsCard
                  isPriority={i < 8}
                  variant={product}
                />
              </div>
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
};
