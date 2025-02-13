import { ValidationTypes } from '@/utils/consts';
import type { ReactNode } from 'react';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean;
}

export interface IField extends IInput {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  EyeIcon?: boolean;
  validation: ValidationTypes;

  initType: string;
  placeholder: string;
  name: string;
}
export interface ICheckbox {
  name: string;
  id: number;
  endAdornment?: ReactNode;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}
