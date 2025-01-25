'use server';
import { cookies } from 'next/headers';

export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete('refreshToken');
  cookieStore.delete('accessToken');
  return true;
}
