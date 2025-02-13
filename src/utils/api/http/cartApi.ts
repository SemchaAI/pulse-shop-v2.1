import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ROUTES } from '@/utils/consts';
import { customFetch } from '@/utils/api';
import { getServerSession } from '@/utils/helpers';
import type { ICartItem, ICartSliceData } from '@/models/cart';

// import type { CreateItem, ICart } from '@/models/cartFavor';
// import { IUserSession } from '@/models/user';

// export const fetchCart = createAsyncThunk<ICartResponse | null, void>(
//   'cart/fetchCart', // action type string
//   async (_, thunkAPI) => {
//     try {
//       const res = await customFetch(API_ROUTES.CART);
//       if (!res.ok) throw new Error('Failed to fetch cart');
//       const cart = await res.json();
//       console.log('Fetched cart:', cart);

//       return cart as ICartResponse;
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       return thunkAPI.rejectWithValue('Failed to fetch cart');
//     }
//   }
// );

export const addCartItem = createAsyncThunk<
  ICartSliceData,
  ICartItem,
  { rejectValue: string }
>('cart/addCartItem', async (item, thunkAPI) => {
  try {
    const { user } = await getServerSession();
    if (!user) {
      //await signIn('credentials', { redirect: false }, 'anon=true');
    }
    const res = await customFetch(API_ROUTES.CART, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to add item');
    const cart = await res.json();
    return cart as ICartSliceData;
  } catch (error) {
    console.error('Error adding item:', error);
    return thunkAPI.rejectWithValue('Failed to add item');
  }
});

// export async function addCartItem(item: ICartItem): Promise<ICart> {
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
//     return cart as ICart;
//   } catch (error) {
//     console.error('Error adding item:', error);
//     throw error;
//   }
// }
