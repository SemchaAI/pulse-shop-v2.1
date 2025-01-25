'use client';
import { Input } from '@/components/shared';
import { ValidationTypes } from '@/utils';
import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface IProps {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  EyeIcon?: boolean;
  validation: ValidationTypes;

  initType: string;
  placeholder: string;
  name: string;
}

export const FieldInput = ({
  id,
  Icon,
  EyeIcon,
  initType = 'text',
  validation,
  ...rest
}: IProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const value = useWatch({ name: id });
  const error = errors[id]?.message as string;
  const [type, setType] = useState(initType);

  const onClickClear = () => {
    setValue(id, '');
  };

  return (
    <div className="flex flex-col gap-px">
      <div className="flex relative">
        {Icon && <Icon className="absolute flex translate-y-1/2 left-3" />}
        <Input
          className="pt-2.5 pb-2.5 pr-5 pl-10"
          id={id}
          type={type}
          {...rest}
          {...register(id, validation || {})}
        />
        {EyeIcon && (
          <button
            className="absolute flex translate-y-1/2 right-3"
            onClick={() =>
              setType((prev) => (prev === 'text' ? 'password' : 'text'))
            }
            type="button"
          >
            {type === 'password' ? (
              <Eye className="cursor-pointer transition-colors hover:stroke-primary focus:stroke-primary" />
            ) : (
              <EyeOff className="cursor-pointer transition-colors hover:stroke-primary focus:stroke-primary" />
            )}
          </button>
        )}
        {!EyeIcon && value ? (
          <X
            className="absolute flex translate-y-1/2 right-3 cursor-pointer transition-colors hover:stroke-primary focus:stroke-primary"
            onClick={onClickClear}
            role="button"
          />
        ) : null}
      </div>
      {validation && (
        <p className="flex items-center h-6 pl-3 text-error">{error}</p>
      )}
    </div>
  );
};
