import { createAction } from '@reduxjs/toolkit';
// import { initCart } from './cart';
// import { initFavorite } from './favorite';
import { IUserSession } from '@/models/auth';

// export const initUserData = createAsyncThunk(
//   'user/initUserData',
//   async (user: IUserSession, { dispatch }) => {
//     dispatch(
//       initCart({
//         cartProducts: [],
//         cartTotal: user.cartTotal,
//         totalAmount: 0,
//       })
//     );

//     dispatch(
//       initFavorite({
//         favoriteProducts: user.favoriteProducts,
//       })
//     );
//   }
// );
export const initUserData = createAction<IUserSession>('user/initUserData');
export const LOGOUT = createAction('LOGOUT');
