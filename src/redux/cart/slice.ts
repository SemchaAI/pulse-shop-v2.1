'use client';
import { ICartResponse, ICartSliceData } from '@/models/cart';
// import { addCartItem } from '@/utils/api/http/cartApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initUserData, LOGOUT } from '../global';

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
    removeCartItemById(state: CartState, action: PayloadAction<number>) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      state.totalAmount = state.cartProducts.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      state.cartTotal = state.cartProducts.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addCartItem.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(addCartItem.fulfilled, (state, action) => {
      //   console.log('addCartItem.fulfilled', action.payload);
      //   state.cartProducts = action.payload.cartProducts;
      //   state.totalAmount = action.payload.totalAmount;
      //   state.cartTotal = action.payload.cartTotal;
      //   state.loading = false;
      // })
      // .addCase(addCartItem.rejected, (state, action) => {
      //   state.error = action.payload as string;
      //   state.loading = false;
      // })
      .addCase(initUserData, (state, action) => {
        state.cartTotal = action.payload.cartTotal;
        state.cartProducts = []; // Start with an empty cart
      })
      .addCase(LOGOUT, () => initialState);
  },
});

export const { clearCart, updateCartTotal, initCart, removeCartItemById } =
  cartSlice.actions;
