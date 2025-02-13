'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import NextImage from 'next/image';
import { ProductThumbnail } from './ProductThumbnail';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/features';
import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts/env';
import type { Image } from '@prisma/client';

type PropType = {
  slides: Image[];
  options?: EmblaOptionsType;
};

export const ProductCarousel: React.FC<PropType> = (props) => {
  const url = NEXT_PUBLIC_IMAGES_HOST;
  if (!url) throw new Error('NEXT_PUBLIC_IMAGES_HOST is not defined.');

  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    // containScroll: 'keepSnaps',
    // dragFree: true,
    slidesToScroll: 1,
    axis: 'y',
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-row-reverse relative mx-auto overflow-hidden rounded-lg bg-card h-full w-full max-w-[450px] sm:max-w-[600px] lg:m-0">
      <div
        className="overflow-hidden aspect-square w-full sm:border-l sm:w-3/4"
        ref={emblaMainRef}
      >
        <div className="flex touch-pan-y w-full">
          {slides.map((img) => (
            <div
              className="flex-shrink-0 flex-grow-0 flex-wrap min-w-0 rounded-lg w-full"
              key={img.id}
            >
              {/* <div className="flex items-center justify-center  text-4xl font-semibold rounded-lg"> */}
              <NextImage
                className="object-contain w-full h-full aspect-square"
                priority={true}
                width="450"
                height="450"
                src={url + img.url}
                // alt={product.title}
                alt="product image"
              />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
      <div
        className="overflow-hidden aspect-square w-1/4 border-primary-main hidden sm:block"
        ref={emblaThumbsRef}
      >
        <div className="flex flex-col w-full h-full">
          {slides.map((img, index) => (
            <ProductThumbnail
              url={url + img.url}
              key={img.id}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              img={img.url}
            />
          ))}
        </div>
      </div>
      <div className="flex sm:hidden absolute inset-x-0 top-[calc(50%-25px)] justify-between pointer-events-none">
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
