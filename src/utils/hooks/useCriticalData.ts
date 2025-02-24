// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './redux';
// import { fetchCart } from '../api/http/cartApi';

// type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

// export const useCriticalData = (status: AuthStatus) => {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((state) => state.cart);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, status]);
// };
