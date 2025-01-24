import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './user';

// import { productsSlice } from '@/redux/products/slice';
// import { filterSlice } from '@/redux/filter/slice';
// import { cartSlice } from '@/redux/cart/slice';
// import { setupListeners } from '@reduxjs/toolkit/query';
const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  // [productsSlice.name]: productsSlice.reducer,
  // [filterSlice.name]: filterSlice.reducer,
  // [cartSlice.name]: cartSlice.reducer,
  // [baseApi.reducerPath]: baseApi.reducer,
});

export function makeStore() {
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
  });
  return store;
}

export const appStore = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
// Export a reusable type for handwritten thunks
