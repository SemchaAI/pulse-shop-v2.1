'use server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { JWT_ACCESS } from '../consts/env';

import type { IUserResponse, IUserSession } from '@/models/auth';

export async function getServerSession(): Promise<IUserResponse> {
  if (!JWT_ACCESS) {
    return {
      user: null,
      message: 'Server configuration error',
      status: 500,
    };
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  if (!refreshToken) {
    return {
      user: null,
      message: 'Unauthorized',
      status: 200,
    };
  }
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return {
      user: null,
      message: 'Unauthorized missing token',
      status: 401,
    };
  }

  let userData: IUserSession | null = null;
  try {
    // userData = jwt.verify(accessToken.value, JWT_ACCESS) as IUserSession;
    const accessSecret = new TextEncoder().encode(JWT_ACCESS);
    const { payload } = await jwtVerify(accessToken.value, accessSecret);
    console.log('jwtVerify', payload);
    userData = payload as unknown as IUserSession;
    return { user: userData, status: 200, message: 'User found' };
  } catch (err) {
    return {
      user: null,
      message: `[GET SERVER SESSION] ${err}`,
      status: 401,
    };
  }
}
