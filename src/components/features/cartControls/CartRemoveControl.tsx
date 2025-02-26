'use client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

import { initCart, removeCartItemById } from '@/redux/cart';
import { removeCartItem } from '@/utils/api/http/cartApi';
import { queryKeys } from '@/utils/consts';
import { Trash2 } from 'lucide-react';
import type { IFlatProduct } from '@/models/cart';
import { queryClient } from '@/utils';

interface IProps {
  item: IFlatProduct;
}

export const CartRemoveControl = ({ item }: IProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.cart, queryKeys.removeCartItem, item.id],
    mutationFn: removeCartItem,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.cart] });
      const prevCart = {
        cartProducts: cart.cartProducts,
        totalAmount: cart.totalAmount,
        cartTotal: cart.cartTotal,
      };
      console.log('prevCart', prevCart);
      dispatch(removeCartItemById(item.id));
      return { prevCart };
    },
    onSuccess: () => {
      toast.success('Item removed from cart');
    },
    onError: (err, _, context) => {
      console.log('err', context);
      if (context?.prevCart) dispatch(initCart(context?.prevCart));
      toast.error('Failed to remove item from cart');
    },
    onSettled: () => {
      // Always refetch the cart after the mutation is settled to ensure consistency
      queryClient.invalidateQueries({ queryKey: [queryKeys.cart] });
    },
  });
  return (
    <button
      aria-label="remove item"
      onClick={() => mutate(item.id)}
      disabled={isPending}
      className="transition-colors p-0.5 rounded-full hover:bg-primary hover:text-black-01 focus:bg-primary focus:text-black-01"
    >
      <Trash2 size={24} />
    </button>
  );
};
