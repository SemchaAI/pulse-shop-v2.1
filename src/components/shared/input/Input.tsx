import { forwardRef } from 'react';
import type { IInput } from '@/models/inputs';

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full p-[10px] outline-none border border-border rounded-md text-text-primary bg-background transition-colors focus:border-primary autofill:caret-transparent ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
