'use client';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Loader2, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  CartList,
  CheckoutPayment,
  FieldInput,
  TextArea,
} from '@/components/entities';
import {
  Button,
  Container,
  EntityBlock,
  StateContainer,
} from '@/components/shared';
import { initCart } from '@/redux/cart';
import { getCart } from '@/utils/api/http/cartApi';
import { fields, queryKeys, required } from '@/utils/consts';
import { useAppDispatch } from '@/utils/hooks';

import type { ICartSliceData } from '@/models/cart';
import type { ICheckoutForm, IUserForm } from '@/models/forms';

interface IProps {
  user: IUserForm | null;
}

export const CheckoutSection = ({ user }: IProps) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ICheckoutForm>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      name: user?.name || '',
      phone: user?.phone || '',
      //-----
      address: '',
      textarea: '',
    },
    mode: 'onBlur',
  });
  const submitHandler = async (data: ICheckoutForm) => {
    try {
      setSubmitting(true);
      //const url = await createOrder(data);
      console.log('data', data);
      toast.success('Order created. Redirecting...', {
        duration: 5000,
        icon: '✅',
      });
      // if (url) {
      //   location.href = url;
      // }
    } catch (error) {
      console.log(error);
      toast.error('Wrong form data', { duration: 5000, icon: '❌' });
    } finally {
      setSubmitting(false);
    }
  };

  const dispatch = useAppDispatch();
  const { data: cart, isLoading } = useQuery<ICartSliceData>({
    queryKey: [queryKeys.cart],
    queryFn: getCart,
  });

  useEffect(() => {
    if (cart) dispatch(initCart(cart));
  }, [dispatch, cart]);

  if (isLoading || !cart)
    return (
      <StateContainer>
        Loading...
        <Loader2
          className="animate-spin"
          size={24}
        />
      </StateContainer>
    );
  return (
    <section className="py-2">
      <Container>
        <h2 className="typo-title-30">Checkout</h2>
        <FormProvider {...form}>
          <form
            className="flex flex-col-reverse lg:flex-row gap-5"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div className="flex grow flex-col gap-5">
              <CartList
                className="h-[242px]"
                cart={cart}
              />
              <EntityBlock>
                <h3 className="typo-title-24 p-2">Personal Information</h3>
                <div className="grid grid-template-cols-2 gap-y-0 gap-x-6">
                  {fields.map((field) => (
                    <FieldInput
                      id={field.id}
                      key={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      aria-label={field.label}
                      initType={field.myType}
                      autoComplete={field.autoComplete}
                      validation={field.validation}
                      Icon={field.icon}
                      mask={field.mask}
                    />
                  ))}
                </div>
              </EntityBlock>
              <EntityBlock>
                <h3 className="typo-title-24 p-2">Delivery Details</h3>
                <FieldInput
                  id="address"
                  name="address"
                  placeholder="str. Example, 123"
                  aria-label="Address"
                  initType="text"
                  autoComplete="street address"
                  validation={required}
                  Icon={Map}
                />
                <TextArea
                  placeholder="Your comments"
                  id="textarea"
                  aria-label="Your comments"
                />
              </EntityBlock>
            </div>
            <CheckoutPayment cart={cart}>
              <Button
                type="submit"
                version="contain"
                className="w-full mt-2"
                disabled={submitting}
              >
                {submitting ? (
                  'Loading...'
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard /> Buy
                  </span>
                )}
              </Button>
            </CheckoutPayment>
          </form>
        </FormProvider>
      </Container>
    </section>
  );
};
