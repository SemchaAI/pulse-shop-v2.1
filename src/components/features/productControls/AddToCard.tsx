'use client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Loader2, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/shared';
import { queryKeys } from '@/utils/consts';
import { useAppDispatch } from '@/utils/hooks';
import { addCartItem } from '@/utils/api/http/cartApi';
import { initCart } from '@/redux/cart';

interface IProps {
  id: number;
  stock: number;
}

export const AddToCard = ({ id, stock }: IProps) => {
  const dispatch = useAppDispatch();
  // const addToCartHandler = async () => {
  //   await dispatch(addCartItem({ productVariantId: id, quantity: 1 }));
  // };

  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.session, queryKeys.addCartItem],
    mutationFn: () => addCartItem({ productVariantId: id, quantity: 1 }),
    onSuccess: (data) => {
      dispatch(initCart(data));
      toast.success('Item added to cart');
    },
    onError: () => {
      toast.error('Failed to add item to cart');
    },
  });
  if (!stock)
    return (
      <div
        className="flex items-center justify-center grow h-full rounded-full
       bg-error text-white text-lg"
      >
        Out of Stock
      </div>
    );
  return (
    <Button
      icon
      version="contain"
      aria-label="Add to cart"
      className="grow gap-1"
      // onClick={addToCartHandler}
      disabled={isPending}
      onClick={mutate}
    >
      {isPending ? (
        <Loader2
          size={24}
          className="animate-spin"
        />
      ) : (
        <>
          <ShoppingCart size={24} />
          To cart
        </>
      )}
    </Button>
  );
};
