'use server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/prisma/prismaClient';
import { IUserSession } from '@/models/auth';
import { userSessionAdapter } from '@/utils/helpers';
import { generateTokens } from '@/utils';
import { JWT_REFRESH } from '@/utils/consts';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken');

    if (!token) {
      return NextResponse.json({});
    }
    if (!JWT_REFRESH) {
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    let decoded: IUserSession | null = null;
    try {
      const refreshSecret = new TextEncoder().encode(JWT_REFRESH);
      const { payload } = await jwtVerify(token.value, refreshSecret);
      decoded = payload as unknown as IUserSession;
    } catch (err) {
      return NextResponse.json(
        { message: `[REFRESH TOKEN] ${err}` },
        { status: 403 }
      );
    }

    // Check if the user exists and issue a new access token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    //adapt user to session
    const userSession = userSessionAdapter(user);
    // Generate a new access token
    const { refreshToken, accessToken } = await generateTokens(userSession);

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    cookieStore.set('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      path: '/',
      maxAge: 60 * 15, // 15min
    });

    return NextResponse.json(
      { accessToken, user: userSession },
      { status: 200 }
    );
  } catch (error) {
    console.error('[REFRESH TOKEN] Error:', error);
    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 403 }
    );
  }
}
