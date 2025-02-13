import { forwardRef } from 'react';
import type { IInput } from '@/models/inputs';

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className = '', rounded, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${
          rounded ? 'rounded-full py-2 px-4' : 'rounded-md p-2'
        } w-full  outline-none border border-border text-text-primary bg-background transition-colors focus:border-primary autofill:caret-transparent ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
