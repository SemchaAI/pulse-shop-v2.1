'use client';
import { Button } from '@/components/shared';
import { useCartHandler } from '@/utils/hooks';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
// import toast from 'react-hot-toast';

interface IProps {
  id: number;
}
export const ProductCartControls = ({ id }: IProps) => {
  const { loading, addToCartHandler, productId } = useCartHandler(id);
  // const dispatch = useAppDispatch();
  // const loading = useAppSelector((state) => state.cart.loading);

  // const handleAddToCart = async () => {
  //   const newItem: ICartItem = {
  //     productVariantId: id,
  //     quantity: 1,
  //   };
  //   await dispatch(addCartItem(newItem));
  // };

  // const { mutate, isPending } = useMutation({
  //   mutationKey: [queryKeys.session, queryKeys.addCartItem],
  //   mutationFn: addCartItem,
  //   onSuccess: () => {
  //     toast.success('Item added to cart');
  //     queryClient.invalidateQueries({ queryKey: [queryKeys.session] });
  //   },
  //   onError: () => {
  //     toast.error('Failed to add item to cart');
  //   },
  // });

  return (
    <div className="flex gap-2 mt-1">
      <Button
        icon
        version="contain"
        label="Add to cart"
        className="grow gap-1"
        onClick={addToCartHandler}
        disabled={loading && productId === id}
        // onClick={() => mutate({ productVariantId: id, quantity: 1 })}
      >
        {loading && productId === id ? (
          <Loader2
            size={24}
            className="animate-spin"
          />
        ) : (
          <>
            <ShoppingCart size={24} /> To cart
          </>
        )}
      </Button>
      <Button
        icon
        version="contain"
        label="Add to favorite"
      >
        <Heart size={24} />
      </Button>
    </div>
  );
};
