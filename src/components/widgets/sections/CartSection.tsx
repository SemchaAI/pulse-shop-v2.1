'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch } from '@/utils/hooks';

import { CartList, CheckoutPayment } from '@/components/entities';
import { Container, StateContainer } from '@/components/shared';
import { initCart } from '@/redux/cart';
import { getCart } from '@/utils/api/http/cartApi';
import { queryKeys, ROUTES } from '@/utils/consts';
import type { ICartSliceData } from '@/models/cart';

export const CartSection = () => {
  console.log('CartSection');
  const dispatch = useAppDispatch();
  // const cartSelector = useAppSelector((state) => state.cart);

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery<ICartSliceData>({
    queryKey: [queryKeys.cart],
    queryFn: getCart,
    // initialData: cartSelector,
  });

  useEffect(() => {
    if (cart) dispatch(initCart(cart));
  }, [dispatch, cart]);

  if (error)
    return (
      <StateContainer>
        Error. Cart wasn`t loaded. {error?.message}
      </StateContainer>
    );
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
  if (cart.cartProducts.length === 0) {
    return (
      <StateContainer>
        <p>Cart is empty</p>
        <Box size={36} />
      </StateContainer>
    );
  }
  return (
    <section className="my-5">
      <Container>
        <h1 className="typo-title-30">Cart</h1>
        <div className="mt-5 flex flex-col-reverse lg:flex-row gap-5">
          <CartList
            className="h-[370px] lg:h-[742px]"
            cart={cart}
          />
          <CheckoutPayment cart={cart}>
            <Link
              className="w-full px-4 py-2 mt-4 flex items-center justify-center rounded-3xl 
              transition-colors text-black-01 bg-primary 
              border border-solid border-transparent 
              hover:bg-transparent hover:border-secondary hover:text-secondary 
              focus:bg-transparent focus:border-secondary focus:text-secondary"
              href={ROUTES.CHECKOUT}
            >
              Checkout
            </Link>
          </CheckoutPayment>
        </div>
      </Container>
    </section>
  );
};
