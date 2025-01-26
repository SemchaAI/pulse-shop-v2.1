import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { decodeJwt } from 'jose';

import { getGoogleToken } from './getGoogleToken';
import { getGoogleUser } from './getGoogleUser';
import { prisma } from '@/prisma/prismaClient';
import { generateTokens } from '@/utils';
import { userSessionAdapter } from '@/utils/helpers';
import { randomUUID } from 'crypto';
import { ROUTES } from '@/utils/consts';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  try {
    if (typeof code !== 'string') {
      // Обработка случая, когда `code` имеет неверный тип
      throw new Error(`Invalid 'code' parameter`);
    }
    const { access_token, id_token } = await getGoogleToken(code);
    const googleUser = decodeJwt(id_token);
    if (!googleUser) {
      throw new Error('Failed to decode token');
    }
    const userData = await getGoogleUser({
      id_token,
      access_token,
    });
    if (!userData) {
      throw new Error('Failed to get user data');
    }

    const cookieStore = await cookies();

    const candidate = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (candidate) {
      if (candidate.provider !== null) {
        // User already logged in with any provider
        console.log('User already authenticated with any provider');
      } else {
        // User exists but with no provider, update their details
        await prisma.user.update({
          where: {
            id: candidate.id,
          },
          data: {
            email: userData.email,
            name: userData.name || `User #${candidate.id}`,
            avatar: userData.picture,
            provider: 'google',
            providerId: userData.id,
            verified: new Date(),
          },
        });
        const verificationCode = await prisma.verificationCode.findFirst({
          where: { userId: candidate.id },
        });
        if (verificationCode) {
          // Clean up any old verification code
          await prisma.verificationCode.delete({
            where: {
              userId: candidate.id,
            },
          });
        }
      }
      const userDTO = userSessionAdapter(candidate);
      const { accessToken, refreshToken } = await generateTokens(userDTO);
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
      return NextResponse.redirect(new URL(ROUTES.HOME));
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: userData.email,
          password: randomUUID(), // Generate a random password since it's Google login
          name: userData.name || `User #${userData.id}`,
          avatar: userData.picture,
          role: 'USER',
          provider: 'google',
          providerId: userData.id,
          verified: new Date(),
        },
      });
      const userDTO = userSessionAdapter(newUser);
      const { accessToken, refreshToken } = await generateTokens(userDTO);
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
      return NextResponse.redirect(new URL(ROUTES.HOME));
    }

    // console.log('[GOOGLE CALLBACK USER] req', req);
  } catch (error) {
    console.log(`[GOOGLE CALLBACK USER] server error ${error}`);
    redirect('/login');
  }
}
