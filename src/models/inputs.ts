import { ValidationTypes } from '@/utils';

export type IInput = React.InputHTMLAttributes<HTMLInputElement>;

export interface IField extends IInput {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  EyeIcon?: boolean;
  validation: ValidationTypes;

  initType: string;
  placeholder: string;
  name: string;
}
