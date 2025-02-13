import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from './user';
import { cartSlice } from './cart';
import { CriticalData } from '@/models/cart';

const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export function makeStore(preloadedState?: CriticalData) {
  console.log('preloadedState', preloadedState);
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: preloadedState
      ? {
          cart: {
            cartProducts: [],
            totalAmount: 0,
            cartTotal: preloadedState.cartTotal,
            loading: false,
            error: null,
          },
        }
      : undefined,
  });
  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof makeStore> extends {
  dispatch: infer D;
}
  ? D
  : never;
// Export a reusable type for handwritten thunks
