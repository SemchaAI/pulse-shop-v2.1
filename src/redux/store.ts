'use client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { favoriteSlice } from './favorite';
import { cartSlice } from './cart';

const rootReducer = combineReducers({
  [favoriteSlice.name]: favoriteSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export function makeStore() {
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
  });
  return store;
}
export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof makeStore> extends {
  dispatch: infer D;
}
  ? D
  : never;
// Export a reusable type for handwritten thunks
