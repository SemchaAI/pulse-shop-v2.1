import type { IUserSession } from '@/models/auth';
import type { User } from '@prisma/client';
interface IUser extends User {
  cartTotal: number;
  favoriteProducts: number[];
}

export const userSessionAdapter = (user: IUser): IUserSession => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    role: user.role,
    avatar: user.avatar,
    cartTotal: user.cartTotal,
    favoriteProducts: user.favoriteProducts,
  };
};
