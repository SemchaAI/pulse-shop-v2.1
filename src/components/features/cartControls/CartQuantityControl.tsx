'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/shared';

import { updateItemQuantity } from '@/utils/api/http/cartApi';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import useDebounce from '@/utils/hooks/useDebounce';
import { initCart } from '@/redux/cart';
import { queryKeys } from '@/utils/consts';
import { queryClient } from '@/utils';
import type { IFlatProduct } from '@/models/cart';

interface IProps {
  item: IFlatProduct;
}

export const CartQuantityControl = ({ item }: IProps) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { mutate } = useMutation({
    mutationKey: [queryKeys.cart, queryKeys.updateCartItem, item.id],
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateItemQuantity(id, quantity),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.cart] });
      const prevCart = { ...cart };
      const updatedCart = {
        ...prevCart,
        cartProducts: prevCart.cartProducts.map((product) =>
          product.id === id ? { ...product, quantity } : product
        ),
        totalAmount: prevCart.cartProducts.reduce((total, product) => {
          if (product.id === id) return total + product.price * quantity;
          return total + product.price * product.quantity;
        }, 0),
      };
      dispatch(initCart(updatedCart));
      return { prevCart };
    },
    onSuccess: () => {
      toast.success('Item quantity updated');
    },
    onError: (error, _, context) => {
      if (context?.prevCart) {
        dispatch(initCart(context.prevCart));
        setLocalQuantity(
          () =>
            context.prevCart.cartProducts.find((p) => p.id === item.id)
              ?.quantity || 1
        );
      }
      toast.error(`Failed to change quantity: ${error}`);
    },
    onSettled: () => {
      // Always refetch the cart after the mutation is settled to ensure consistency
      queryClient.invalidateQueries({ queryKey: [queryKeys.cart] });
    },
  });

  useDebounce(
    () => {
      if (localQuantity === item.quantity) return;
      if (localQuantity <= 0) {
        setLocalQuantity(1);
        mutate({ id: item.id, quantity: 1 });
      } else if (localQuantity > item.stock) {
        setLocalQuantity(item.stock);
        mutate({ id: item.id, quantity: item.stock });
      } else {
        mutate({ id: item.id, quantity: localQuantity });
      }
    },
    500,
    [localQuantity]
  );
  const decreaseQuantityHandler = () => {
    if (localQuantity <= 1) setLocalQuantity(1);
    else setLocalQuantity((prev) => prev - 1);
  };
  const increaseQuantityHandler = () => {
    if (item.stock <= localQuantity) setLocalQuantity(item.stock);
    else setLocalQuantity((prev) => prev + 1);
  };

  return (
    <div className="h-11 w-fit flex items-center gap-1 p-1 rounded-md">
      <Button
        aria-label="decrease quantity"
        onClick={decreaseQuantityHandler}
        version="outline"
        icon={true}
        className="rounded-md"
        disabled={localQuantity <= 1}
      >
        <Minus size={18} />
      </Button>
      <span className="min-w-9 h-full flex items-center justify-center border border-border rounded-md bg-foreground">
        {localQuantity}:{item.quantity}
      </span>
      <input
        min={1}
        max={3}
        step={1}
        placeholder={`${localQuantity}`}
        type="number"
        onChange={(e) => setLocalQuantity(Number(e.target.value))}
        value={localQuantity}
        className="w-9 h-full flex items-center justify-center border border-border rounded-md bg-foreground"
      />
      <Button
        aria-label="increase quantity"
        onClick={increaseQuantityHandler}
        version="outline"
        icon={true}
        className="rounded-md"
        disabled={localQuantity >= item.stock}
      >
        <Plus size={18} />
      </Button>
    </div>
  );
};

// const debouncedMutate = useCallback(
//   debounce((id: number, quantity: number) => {
//     mutate({ id, quantity: quantity });
//   }, 500),
//   []
// );

// const decreaseQuantityHandler = (item: IFlatProduct) => {
//   if (localQuantity <= 1) {
//     toast.error('Min quantity is 1');
//   } else {
//     const newQuantity = localQuantity - 1;
//     setLocalQuantity(newQuantity); // Update local quantity
//     debouncedMutate(item.id, newQuantity); // Debounced mutation call
//   }
// };
// const increaseQuantityHandler = (item: IFlatProduct) => {
//   if (item.stock <= localQuantity) {
//     toast.error('Max quantity is ' + item.stock);
//   } else {
//     const newQuantity = localQuantity + 1;
//     setLocalQuantity(newQuantity); // Update local quantity
//     debouncedMutate(item.id, newQuantity); // Debounced mutation call
//   }
// };
// const changeInputQuantityHandler = (
//   e: React.ChangeEvent<HTMLInputElement>
// ) => {
//   let newQuantity = Number(e.target.value);
//   if (newQuantity <= 0) newQuantity = 1;
//   if (newQuantity > item.stock) newQuantity = item.stock;
//   setLocalQuantity(newQuantity); // Update local quantity
//   debouncedMutate(item.id, newQuantity); // Debounced mutation call
// };
