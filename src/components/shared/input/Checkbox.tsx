import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import type { ICheckbox } from '@/models/inputs';

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
  ({ id, endAdornment, onChange, checked, name }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          onChange={(e) => onChange && onChange(e.target.checked)}
          checked={checked}
          value={id}
          id={`${name}-${id}`}
          className="hidden"
        />
        <label
          htmlFor={`${name}-${id}`}
          className="flex items-center gap-2 cursor-pointer user-select-none"
        >
          <div
            className={`flex items-center justify-center rounded-lg w-6 h-6 border transition-colors ${
              checked ? 'bg-primary border-primary' : 'border-border'
            }`}
          >
            {checked && <Check className="p-0.5 text-contrast" />}
          </div>
          <div>{name}</div>
        </label>
        {endAdornment}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
