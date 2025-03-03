import { API_ROUTES } from '@/utils/consts';
import { customFetch } from '../helpers/customFetch';
import type { IUserForm } from '@/models/forms';

export const updateUserInfo = async (user: IUserForm) => {
  try {
    const res = await customFetch(API_ROUTES.USER, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data as { message: string };
  } catch (error) {
    console.log('[UPDATE USER]:', error);
    throw new Error('[UPDATE USER]: Something went wrong');
  }
};
