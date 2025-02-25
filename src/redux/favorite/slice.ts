'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initUserData, LOGOUT } from '../global';

interface FavoriteState {
  loading: boolean;
  error: string | null;
  favoriteProducts: number[];
}

const initialState: FavoriteState = {
  loading: false,
  error: null,
  favoriteProducts: [],
  // totalAmount: 0,
  // favoriteTotal: 0,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    initFavorite(
      state: FavoriteState,
      action: PayloadAction<{ favoriteProducts: number[] }>
    ) {
      state.favoriteProducts = action.payload.favoriteProducts;
      // state.totalAmount = action.payload.totalAmount;
      // state.favoriteTotal = action.payload.favoriteTotal;
    },
    clearFavorite(state: FavoriteState) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGOUT, () => initialState)
      .addCase(initUserData, (state, action) => {
        state.favoriteProducts = action.payload.favoriteProducts;
      });
  },
});

export const { initFavorite, clearFavorite } = favoriteSlice.actions;
