'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/utils/hooks';

import { CartProduct } from '@/components/entities';
import { Container, EntityBlock, StateContainer } from '@/components/shared';
import { initCart } from '@/redux/cart';
import { getCart } from '@/utils/api/http/cartApi';
import { queryKeys } from '@/utils/consts';
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
    retry: 1, // custom fetch will check for 401 error other errors only once
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
        <div className="mt-5 flex gap-5">
          <EntityBlock className="flex-grow">
            <ul className="h-[740px] flex flex-col items-center gap-2 flex-grow p-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {cart &&
                cart.cartProducts.map((product, index) => (
                  <CartProduct
                    key={product.id}
                    index={index}
                    item={product}
                  />
                ))}
            </ul>
          </EntityBlock>
          <EntityBlock className="w-96 h-fit sticky top-5">
            <div className="w-full flex justify-between pb-2 border-b border-border">
              <p>In cart:</p>
              <p>
                {cart.cartTotal} item{cart.cartTotal > 1 ? 's' : ''}.
              </p>
            </div>
            <div className="w-full flex justify-between">
              <p>Total price:</p>
              <p>{cart.totalAmount} MDL</p>
            </div>
          </EntityBlock>
        </div>
      </Container>
    </section>
  );
};
