import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { JWT_REFRESH } from '@/utils/consts';
import type { IUserSession } from '@/models/auth';

const JWT_REFRESH_SECRET = new TextEncoder().encode(JWT_REFRESH);

export default async function middleware(req: NextRequest) {
  console.log('MIDDLEWARE init');
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const accessToken = req.cookies.get('accessToken')?.value;

  // If no refresh token, redirect to login
  if (!refreshToken) {
    const isAdminOrProtectedPath = ['/admin', '/protected'].some((path) =>
      req.nextUrl.pathname.includes(path)
    );
    if (isAdminOrProtectedPath) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Continue if it's not a protected path
  }

  try {
    const { payload } = await jwtVerify(refreshToken, JWT_REFRESH_SECRET);
    const decoded = payload as unknown as IUserSession;
    if (!decoded) throw new Error('Invalid token payload');

    const tokenExpiration = payload.exp ? new Date(payload.exp * 1000) : null;
    if (!tokenExpiration || tokenExpiration <= new Date()) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Role-based access control for admin paths
    if (
      req.nextUrl.pathname.includes('/admin') &&
      decoded.role !== Role.ADMIN
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Refresh access token if necessary
    if (!accessToken) {
      const newSession = await fetch(
        'http://localhost:3000/api/auth/middleware',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!newSession.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const sessionData = await newSession.json();
      if (sessionData.refreshToken && sessionData.accessToken) {
        const res = NextResponse.next();
        res.cookies.set('refreshToken', sessionData.refreshToken, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        res.cookies.set('accessToken', sessionData.accessToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          maxAge: 60 * 15, // 15 minutes
        });
        return res;
      }
    }
  } catch (err) {
    console.error('Token verification failed', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Continue if everything is fine
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
  //['/', '/protected/:path*', '/admin/:path*'],
};

// export default async function middleware(req: NextRequest) {
//   console.log('MIDDLEWARE init');
//   const refreshToken = req.cookies.get('refreshToken')?.value;
//   if (!refreshToken) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   } else if (refreshToken) {
//     try {
//       const { payload } = await jwtVerify(refreshToken, JWT_REFRESH_SECRET);
//       const decoded = payload as unknown as IUserSession;
//       if (!decoded) {
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//       const tokenExpiration = payload.exp ? new Date(payload.exp * 1000) : null;
//       if (!tokenExpiration || tokenExpiration <= new Date()) {
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//       const isAdminPath = req.nextUrl.pathname.includes('/admin');
//       console.log('isAdminPath', isAdminPath);
//       if (isAdminPath && decoded.role !== Role.ADMIN) {
//         return NextResponse.redirect(new URL('/', req.url));
//       }
//     } catch {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }
//   return NextResponse.next();
// }
