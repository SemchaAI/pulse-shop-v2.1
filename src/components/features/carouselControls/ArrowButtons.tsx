'use client';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="group transition-colors inline-flex items-center justify-center bg-transparent touch-manipulation cursor-pointer border-0 p-0 m-0 w-[35px] h-[35px] z-[1] pointer-events-auto disabled:opacity-50"
      type="button"
      aria-label="Previous slide"
      {...restProps}
    >
      <ChevronLeft
        size={35}
        className="transition-colors stroke-primary rounded-r-md group-hover:bg-action-disabled group-focus:bg-action-disabled"
      />
      {children}
    </button>
  );
};

const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="group transition-colors inline-flex items-center justify-center bg-transparent touch-manipulation cursor-pointer border-0 p-0 m-0 w-[35px] h-[35px] z-[1] pointer-events-auto disabled:opacity-50"
      type="button"
      aria-label="Next slide"
      {...restProps}
    >
      <ChevronRight
        size={35}
        className="transition-colors stroke-primary rounded-l-md group-hover:bg-action-disabled group-focus:bg-action-disabled"
      />
      {children}
    </button>
  );
};
export { usePrevNextButtons, PrevButton, NextButton };
