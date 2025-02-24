// 'use client';
// import { useEffect, useState } from 'react';
// import type { IUserSession } from '@/models/auth';
// import Cookies from 'js-cookie';
// import { useAppDispatch, useAppSelector } from './redux';
// import { initCart } from '@/redux/cart';

// export const useSession = () => {
//   const [user, setUser] = useState<IUserSession | null>(null);
//   const cart = useAppSelector((state) => state.cart);
//   const dispatch = useAppDispatch();
//   const token = Cookies.get('accessToken');
//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded: IUserSession = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
//         dispatch(
//           initCart({
//             cartProducts: [],
//             cartTotal: decoded.cartTotal,
//             totalAmount: 0,
//           })
//         );
//         setUser(decoded);
//         console.log('decoded', decoded);
//       } catch (error) {
//         console.error(`Invalid token: ${error}`);
//       }
//     } else {
//       setUser(null);
//     }
//   }, [dispatch, token]);

//   return { user, cart };
// };
