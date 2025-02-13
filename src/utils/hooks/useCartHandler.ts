import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from './redux';
import { addCartItem } from '../api/http/cartApi';

export const useCartHandler = (id: number) => {
  const [productId, setProductId] = useState(-1);
  const dispatch = useAppDispatch();
  const { loading, cartTotal } = useAppSelector((state) => state.cart);

  const addToCartHandler = async () => {
    try {
      if (loading && cartTotal > 0)
        return toast.loading('Wait.Adding to cart previous request...', {
          duration: 3000,
        });
      setProductId(id);
      await dispatch(addCartItem({ productVariantId: id, quantity: 1 }));
      toast.success('Product added to cart');
    } catch (error) {
      console.log(error);
      toast.error('Product not added to cart');
    } finally {
      setProductId(-1);
    }
  };

  return { addToCartHandler, loading, productId };
};
