'use client';
import { ICartResponse, ICartSliceData } from '@/models/cart';
import { addCartItem } from '@/utils/api/http/cartApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState extends ICartSliceData {
  loading: boolean;
  error: string | null;
  cartTotal: number;
}

const initialState: CartState = {
  loading: false,
  error: null,
  cartProducts: [],
  totalAmount: 0,
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart(state: CartState, action: PayloadAction<ICartSliceData>) {
      state.cartProducts = action.payload.cartProducts;
      state.totalAmount = action.payload.totalAmount;
      state.cartTotal = action.payload.cartTotal;
    },
    clearCart(state: CartState) {
      state.cartProducts = [];
      state.totalAmount = 0;
      state.error = null;
    },
    updateCartTotal(state: CartState, action: PayloadAction<ICartResponse>) {
      state.cartTotal = action.payload.cartProducts.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        console.log('addCartItem.fulfilled', action.payload);
        state.cartProducts = action.payload.cartProducts;
        state.totalAmount = action.payload.totalAmount;
        state.cartTotal = action.payload.cartTotal;
        state.loading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearCart, updateCartTotal, initCart } = cartSlice.actions;

// .addCase(fetchCart.pending, (state: CartState) => {
//   state.loading = true;
//   state.error = null;
// })
// .addCase(
//   fetchCart.fulfilled,
//   (state: CartState, action: PayloadAction<ICartResponse | null>) => {
//     state.loading = false;
//     if (action.payload) {
//       state.cartProducts = action.payload.cartProducts;
//       state.totalAmount = action.payload.totalAmount || 0;
//     }
//   }
// )
// .addCase(fetchCart.rejected, (state, action) => {
//   state.loading = false;
//   state.error = (action.payload as string) || 'Failed to fetch cart';
// })
