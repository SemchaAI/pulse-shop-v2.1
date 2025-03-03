'use client';
import { useFormContext } from 'react-hook-form';

interface IProps {
  id: string;
  className?: string;
  placeholder?: string;
}

export const TextArea = ({ id, placeholder, className, ...props }: IProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        {...register(id)}
        {...props}
        className={`
          w-full min-h-[100px] p-3 rounded-lg border border-border outline-none
          transition-colors bg-background text-text-primary resize-none 
          focus:border-primary autofill:caret-transparent
          ${className || ''}
        `}
      />
      {errors[id] && (
        <p className="text-error text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

TextArea.displayName = 'TextArea';
