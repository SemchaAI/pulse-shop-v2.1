import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { JWT_REFRESH } from './utils/consts';
import { IUserSession } from './models/auth';
import { Role } from '@prisma/client';

const JWT_REFRESH_SECRET = new TextEncoder().encode(JWT_REFRESH);

export default async function middleware(req: NextRequest) {
  console.log('MIDDLEWARE init');
  const refreshToken = req.cookies.get('refreshToken')?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, JWT_REFRESH_SECRET);
      const decoded = payload as unknown as IUserSession;
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      const tokenExpiration = payload.exp ? new Date(payload.exp * 1000) : null;
      if (!tokenExpiration || tokenExpiration <= new Date()) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      const isAdminPath = req.nextUrl.pathname.includes('/admin');
      console.log('isAdminPath', isAdminPath);
      if (isAdminPath && decoded.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/profile', '/protected/:path*', '/admin/:path*'],
};
