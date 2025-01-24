import { IUserSession } from '@/models/auth';
import { User } from '@prisma/client';

export const userSessionAdapter = (user: User): IUserSession => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
};
