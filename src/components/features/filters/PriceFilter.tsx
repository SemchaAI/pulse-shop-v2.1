'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { formUrlQuery } from '@/utils/helpers';
import useDebounce from '@/utils/hooks/useDebounce';

import { Input } from '@/components/shared';
import { RangeSlider } from '@/components/entities';

interface IProps {
  min?: number;
  max?: number;
  step?: number;
  paramKeys: { paramFrom: string; paramTo: string };
}

export const PriceFilter = ({
  min = 0,
  max = 100,
  step = 1,
  paramKeys,
}: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramFrom = searchParams.get(paramKeys.paramFrom);
  const paramTo = searchParams.get(paramKeys.paramTo);

  const currMin = paramFrom ? Number(paramFrom) : min;
  const currMax = paramTo ? Number(paramTo) : max;

  const [range, setRange] = useState({ min: currMin, max: currMax });

  useDebounce(
    () => {
      let urlFrom = min;
      let urlTo = max;
      if (range.min >= min && range.min + step <= range.max) {
        urlFrom = range.min;
      } else setRange((prev) => ({ min, max: prev.max }));
      if (range.max <= max && range.max - step >= range.min) {
        urlTo = range.max;
      } else setRange((prev) => ({ min: prev.min, max }));
      const newUrl = formUrlQuery({
        key: [paramKeys.paramFrom, paramKeys.paramTo],
        value: [urlFrom.toString(), urlTo.toString()],
        params: searchParams.toString(),
      });
      if (window.location.search === newUrl) return;
      router.push(newUrl);
    },
    500,
    [range.min, range.max]
  );

  return (
    <div className="flex flex-col gap-2 w-full p-2 border border-border rounded-xl">
      <div className="flex gap-2 w-full">
        <Input
          type="number"
          min={min}
          max={max - step}
          step={step}
          placeholder={`${currMin}`}
          value={range.min !== min ? range.min : ''}
          onChange={(e) =>
            setRange({ min: Number(e.target.value), max: range.max })
          }
          className="p-[4px]"
        />
        <Input
          type="number"
          min={min + step}
          max={max}
          step={step}
          placeholder={`${currMax}`}
          value={range.max !== max ? range.max : ''}
          onChange={(e) =>
            setRange({ min: range.min, max: Number(e.target.value) })
          }
          className="p-[4px]"
        />
      </div>
      <RangeSlider
        currMin={currMin}
        currMax={currMax}
        min={min}
        max={max}
        step={step}
        onChange={setRange}
      />
    </div>
  );
};

// export const PriceFilter = ({
//   min = 0,
//   max = 100,
//   step = 1,
//   currMax = max,
//   currMin = min,
// }: IProps) => {
//   console.log('PriceFilter', currMin, currMax);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const firstRender = useRef(false);

//   const [range, setRange] = useState({ min, max });
//   const minMaxRefs = useRef({ min: currMin, max: currMax });

//   useDebounce(
//     () => {
//       if (!firstRender.current) {
//         firstRender.current = true;
//         return;
//       }
//       if (range.min >= min && range.min + step <= range.max) {
//         minMaxRefs.current.min = range.min;
//       } else {
//         minMaxRefs.current.min = min;
//         setRange((prev) => ({ min, max: prev.max }));
//       }
//       if (range.max <= max && range.max - step >= range.min) {
//         minMaxRefs.current.max = range.max;
//       } else {
//         minMaxRefs.current.max = max;
//         setRange((prev) => ({ min: prev.min, max }));
//       }
//       const newUrl = formUrlQuery({
//         key: ['priceFrom', 'priceTo'],
//         value: [
//           minMaxRefs.current.min.toString(),
//           minMaxRefs.current.max.toString(),
//         ],
//         params: searchParams.toString(),
//       });
//       if (window.location.search === newUrl) return;
//       router.push(newUrl);
//     },
//     500,
//     [range.min, range.max]
//   );

//   return (
//     <div className="flex flex-col gap-2 w-full p-2 border border-border rounded-xl">
//       <div className="flex gap-2 w-full">
//         <Input
//           type="number"
//           min={min}
//           max={max - step}
//           step={step}
//           placeholder={`${currMin}`}
//           value={range.min}
//           onChange={(e) =>
//             setRange({ min: Number(e.target.value), max: range.max })
//           }
//           className="w-1/2 p-[4px]"
//         />
//         <Input
//           type="number"
//           min={min + step}
//           max={max}
//           step={step}
//           placeholder={`${currMax}`}
//           value={range.max}
//           onChange={(e) =>
//             setRange({ min: range.min, max: Number(e.target.value) })
//           }
//           className="w-1/2 p-[4px]"
//         />
//       </div>
//       <RangeSlider
//         currMin={minMaxRefs.current.min}
//         currMax={minMaxRefs.current.max}
//         min={min}
//         max={max}
//         step={step}
//         onChange={setRange}
//       />
//     </div>
//   );
// };

// export const PriceFilter = ({ min = 0, max = 100, step = 1 }: IProps) => {
//   console.log('PriceFilter');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const firstRender = useRef(false);

//   const [range, setRange] = useState({ min, max });
//   const smartMin = useRef(min);
//   const smartMax = useRef(max);

//   useDebounce(
//     () => {
//       if (!firstRender.current) {
//         firstRender.current = true;
//         return;
//       }
//       if (
//         range.min >= min &&
//         range.max <= max &&
//         range.min + step <= range.max &&
//         range.max - step >= range.min
//       ) {
//         smartMin.current = range.min;
//         smartMax.current = range.max;
//         const newUrl = formUrlQuery({
//           key: ['priceFrom', 'priceTo'],
//           value: [range.min.toString(), range.max.toString()],
//           params: searchParams.toString(),
//         });
//         if (window.location.search === newUrl) return;
//         router.push(newUrl);
//       } else {
//         const newUrl = formUrlQuery({
//           key: ['priceFrom', 'priceTo'],
//           value: [min.toString(), max.toString()],
//           params: searchParams.toString(),
//         });
//         smartMin.current = min;
//         smartMax.current = max;
//         setRange({ min, max });
//         router.push(newUrl);
//       }
//     },
//     500,
//     [range.min, range.max]
//   );

//   return (
//     <div className="flex flex-col gap-2 w-full p-2 border border-border rounded-xl">
//       <div className="flex gap-2 w-full">
//         <Input
//           type="number"
//           min={min}
//           max={max - step}
//           step={step}
//           placeholder={`${min}`}
//           value={range.min}
//           onChange={(e) =>
//             setRange({ min: Number(e.target.value), max: range.max })
//           }
//           className="w-1/2 p-[4px]"
//         />
//         <Input
//           type="number"
//           min={min + step}
//           max={max}
//           step={step}
//           placeholder={`${max}`}
//           value={range.max}
//           onChange={(e) =>
//             setRange({ min: range.min, max: Number(e.target.value) })
//           }
//           className="w-1/2 p-[4px]"
//         />
//       </div>
//       <RangeSlider
//         currMin={smartMin.current}
//         currMax={smartMax.current}
//         min={min}
//         max={max}
//         step={step}
//         onChange={setRange}
//       />
//     </div>
//   );
// };

// export const PriceFilter = ({
//   min = 0,
//   max = 100,
//   step = 1,
//   onChange,
// }: IProps) => {
//   console.log('PriceFilter');
//   const [range, setRange] = useState({ min, max }); // Stores validated values for the slider
//   const [inputMin, setInputMin] = useState(min); // Stores immediate user input
//   const [inputMax, setInputMax] = useState(max);

//   // Update range only when the input values are valid
//   const updatePrices = (prices: { min: number; max: number }) => {
//     if (
//       prices.min >= min &&
//       prices.max <= max &&
//       prices.min + step <= prices.max &&
//       prices.max - step >= prices.min
//     ) {
//       setRange(prices);
//     } else {
//       setRange({ min, max });
//     }
//   };

//   useDebounce(
//     () => {
//       updatePrices({ min: inputMin, max: inputMax });
//     },
//     500,
//     [inputMin, inputMax]
//   );
//   useDebounce(
//     () => {
//       onChange('priceFrom', inputMin);
//       onChange('priceTo', inputMax);
//     },
//     500,
//     [range.min, range.max]
//   );

//   useEffect(() => {
//     setInputMin(range.min);
//     setInputMax(range.max);
//   }, [range.min, range.max]);

//   return (
//     <div className="flex flex-col gap-2 w-full p-2 border border-border rounded-xl">
//       <div className="flex gap-2 w-full">
//         <Input
//           type="number"
//           min={min}
//           max={max - step}
//           step={step}
//           placeholder={`${min}`}
//           value={inputMin}
//           onChange={(e) => setInputMin(Number(e.target.value))}
//           className="w-1/2 p-[4px]"
//         />

//         <Input
//           type="number"
//           min={min + step}
//           max={max}
//           step={step}
//           placeholder={`${max}`}
//           value={inputMax}
//           onChange={(e) => setInputMax(Number(e.target.value))}
//           className="w-1/2 p-[4px]"
//         />
//       </div>
//       <RangeSlider
//         currMin={range.min}
//         currMax={range.max}
//         min={min}
//         max={max}
//         step={step}
//         onChange={updatePrices}
//       />
//     </div>
//   );
// };
