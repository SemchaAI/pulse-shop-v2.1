import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { JWT_REFRESH } from './utils/consts';
import { IUserSession } from './models/auth';
import { Role } from '@prisma/client';

const JWT_REFRESH_SECRET = new TextEncoder().encode(JWT_REFRESH);

export default async function middleware(req: NextRequest) {
  console.log('MIDDLEWARE init');
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const toLogin = NextResponse.redirect(new URL('/login', req.url));
  if (!refreshToken) return toLogin;
  try {
    const { payload } = await jwtVerify(refreshToken, JWT_REFRESH_SECRET);
    const decoded = payload as unknown as IUserSession;
    if (!decoded) return toLogin;
    const tokenExpiration = payload.exp ? new Date(payload.exp * 1000) : null;
    if (!tokenExpiration || tokenExpiration <= new Date()) return toLogin;
    const isAdminPath = req.nextUrl.pathname.includes('/admin');
    console.log('isAdminPath', isAdminPath);
    if (isAdminPath && decoded.role !== Role.ADMIN) return toLogin;
  } catch {
    return toLogin;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/protected/:path*', '/admin/:path*'],
};
