import type { IUserSession } from '@/models/auth';
import { customFetch } from '@/utils/api';
import { API_ROUTES } from '@/utils/consts';

export async function getSession(): Promise<IUserSession | null> {
  const res = await customFetch(API_ROUTES.SESSION, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res || !res.ok) return null;
  const { user } = await res.json();
  if (!user) return null;
  return user;
}
