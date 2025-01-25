'use server';
import { SignJWT, jwtVerify } from 'jose';
import type { IUserSession } from '@/models/auth';
import { JWT_REFRESH, JWT_ACCESS } from '@/utils/consts';

// Create JWT token
export const generateTokens = async (payload: IUserSession) => {
  if (!JWT_REFRESH || !JWT_ACCESS) throw new Error('JWT_SECRET is not defined');

  const accessSecret = new TextEncoder().encode(JWT_ACCESS);
  const refreshSecret = new TextEncoder().encode(JWT_REFRESH);

  const accessToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30m')
    .sign(accessSecret);

  const refreshToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(refreshSecret);

  return {
    accessToken,
    refreshToken,
  };
};

export const validateAccessToken = async (token: string) => {
  if (!JWT_REFRESH || !JWT_ACCESS) throw new Error('JWT_SECRET is not defined');

  try {
    const accessSecret = new TextEncoder().encode(JWT_ACCESS);
    const { payload } = await jwtVerify(token, accessSecret);
    return payload;
  } catch {
    return null;
  }
};
export const validateRefreshToken = async (token: string) => {
  if (!JWT_REFRESH || !JWT_ACCESS) throw new Error('JWT_SECRET is not defined');

  try {
    const refreshSecret = new TextEncoder().encode(JWT_REFRESH);
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload;
  } catch {
    return null;
  }
};
