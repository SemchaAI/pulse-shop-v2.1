// import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROUTES } from '@/utils/consts';
import { customFetch } from '@/utils/api';
import type { ICartItem, ICartSliceData } from '@/models/cart';

// export const addCartItem = createAsyncThunk<
//   ICartSliceData,
//   ICartItem,
//   { rejectValue: string }
// >('cart/addCartItem', async (item, thunkAPI) => {
//   try {
//     const { user } = await getServerSession();
//     if (!user) {
//       //await signIn('credentials', { redirect: false }, 'anon=true');
//     }
//     const res = await customFetch(API_ROUTES.CART, {
//       method: 'POST',
//       body: JSON.stringify(item),
//     });
//     if (!res.ok) throw new Error('Failed to add item');
//     const cart = await res.json();
//     return cart as ICartSliceData;
//   } catch (error) {
//     console.log('Error adding item:', error);
//     return thunkAPI.rejectWithValue('Failed to add item');
//   }
// });
export const addCartItem = async (item: ICartItem) => {
  try {
    const res = await customFetch(API_ROUTES.CART, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to add item');
    const cart = await res.json();
    return cart as ICartSliceData;
  } catch (error) {
    console.log('[ADD TO CART]:', error);
    throw new Error('[ADD TO CART]: Something went wrong');
  }
};

export const getCart = async (): Promise<ICartSliceData> => {
  try {
    const res = await customFetch(API_ROUTES.CART);
    if (!res.ok) throw new Error('Failed to get cart');
    return await res.json();
  } catch (error) {
    console.log('Failed to get cart:', error);
    throw new Error('Failed to get cart');
  }
};

export const removeCartItem = async (id: number): Promise<ICartSliceData> => {
  try {
    const res = await customFetch(`${API_ROUTES.CART}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error('Failed to remove item');

    return await res.json();
  } catch (error) {
    console.log('Error removing cart item:', error);
    throw new Error('Failed to remove item');
  }
};

export const updateItemQuantity = async (
  id: number,
  quantity: number
): Promise<ICartSliceData> => {
  try {
    const res = await customFetch(`${API_ROUTES.CART}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ id, quantity }),
    });
    if (!res.ok) {
      throw new Error('Failed to update item quantity');
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw new Error('Failed to update item quantity');
  }
};
