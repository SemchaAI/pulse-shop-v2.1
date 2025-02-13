'use client';
import { useEffect, useState, useRef } from 'react';

interface MultiRangeSliderProps {
  step: number;
  min: number;
  max: number;
  currMin: number;
  currMax: number;
  onChange: (values: { min: number; max: number }) => void;
}

export const RangeSlider = ({
  min,
  max,
  currMin,
  currMax,
  step,
  onChange,
}: MultiRangeSliderProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const [minValue, setMinValue] = useState(currMin);
  const [maxValue, setMaxValue] = useState(currMax);

  //sync with data outside
  useEffect(() => {
    setMinValue(currMin);
    setMaxValue(currMax);
  }, [currMin, currMax]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (minValue / max) * 100 + '%';
      progressRef.current.style.right = 100 - (maxValue / max) * 100 + '%';
    }
  }, [minValue, maxValue, max, step]);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin + step <= maxValue) {
      setMinValue(newMin);
      onChange({ min: newMin, max: maxValue });
    }
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax - step >= minValue) {
      setMaxValue(newMax);
      onChange({ min: minValue, max: newMax });
    }
  };

  return (
    <div className="relative w-full h-1 my-3">
      <div className="slider relative h-1 rounded-md bg-border">
        <div
          className="progress absolute h-1 bg-primary rounded"
          ref={progressRef}
        />
      </div>

      <div className="range-input relative">
        <input
          onChange={handleMin}
          type="range"
          min={min}
          step={step}
          max={max}
          value={minValue}
          className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
        />
        <input
          onChange={handleMax}
          type="range"
          min={min}
          step={step}
          max={max}
          value={maxValue}
          className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
        />
      </div>
    </div>
  );
};
