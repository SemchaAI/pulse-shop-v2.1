'use client';
import { Container, EntityBlock } from '@/components/shared';
import type { ICartSliceData } from '@/models/cart';
import { initCart } from '@/redux/cart';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';

interface IProps {
  cart: ICartSliceData;
}

export const CartSection = ({ cart: cartData }: IProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (cartData) {
      dispatch(initCart(cartData));
    }
  }, [dispatch, cartData]);
  return (
    <section className="my-5">
      <Container>
        <h1 className="typo-title-30">Cart</h1>

        <div className="mt-5 flex gap-5">
          <EntityBlock className="flex-grow">
            <ul className="h-[740px] flex flex-col items-center gap-2 flex-grow p-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {cart &&
                cart.cartProducts.map((product) => {
                  return <li key={product.id}>{product.name}</li>;
                })}
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
            {/* CartControls */}
          </EntityBlock>
        </div>
        <div className="h-80"></div>
      </Container>
    </section>
  );
};
