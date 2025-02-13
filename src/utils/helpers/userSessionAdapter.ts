import { IUserSession } from '@/models/auth';
import { User } from '@prisma/client';

// interface IUser extends User {
//   cart: {
//     _count: {
//       cartProducts: number;
//     };
//   } | null;
//   favorite: {
//     _count: {
//       favoriteProducts: number;
//     };
//   } | null;
// }
export const userSessionAdapter = (user: User): IUserSession => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    role: user.role,
    avatar: user.avatar,
    // cartTotal: user.cart ? user.cart._count.cartProducts : 0,
    // favoriteTotal: user.favorite ? user.favorite._count.favoriteProducts : 0,
  };
};
