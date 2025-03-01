'use client';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import type { ReactNode } from 'react';

interface DynamicFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  children: ReactNode;
  formControls?: ReactNode;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  formControls,
}: DynamicFormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className="min-w-80 w-full"
        //rounded-lg bg-foreground border border-border  p-3
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}
        {formControls}
      </form>
    </FormProvider>
  );
};
