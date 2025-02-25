import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { decodeJwt } from 'jose';

import { getGoogleToken } from './getGoogleToken';
import { getGoogleUser } from './getGoogleUser';
import { prisma } from '@/prisma/prismaClient';
import { generateTokens } from '@/utils';
import { userSessionAdapter } from '@/utils/helpers';
import { randomUUID } from 'crypto';
import { Role } from '@prisma/client';
import { NEXT_PUBLIC_SERVER_DOMAIN_URL } from '@/utils/consts/env';

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

    const isAlreadyExists = await prisma.user.findUnique({
      where: { providerId: userData.id },
      include: {
        cart: { include: { _count: { select: { cartProducts: true } } } },
        favorite: {
          include: {
            favoriteProducts: {
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (isAlreadyExists) {
      const userDTO = userSessionAdapter({
        ...isAlreadyExists,
        cartTotal: isAlreadyExists.cart?._count.cartProducts || 0,
        favoriteProducts:
          isAlreadyExists.favorite?.favoriteProducts.map((item) => item.id) ||
          [],
      });
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
      return NextResponse.redirect(new URL(NEXT_PUBLIC_SERVER_DOMAIN_URL));
    }

    const candidate = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (candidate) {
      if (candidate.provider !== null)
        throw new Error('User already authenticated with any provider');
      // User exists but with no provider, update their details
      const newUser = await prisma.user.update({
        where: {
          id: candidate.id,
        },
        data: {
          email: userData.email,
          name: userData.name || `User #${candidate.id}`,
          avatar: userData.picture,
          role: Role.USER,
          provider: 'google',
          providerId: userData.id,
          verified: new Date(),
          password: randomUUID(),
          // we need to block possibility to login with password
          // because have situation when someone signup with this email
          //and not verified (he haven't access to this email)
        },
        include: {
          cart: {
            include: {
              _count: {
                select: { cartProducts: true },
              },
            },
          },
          favorite: {
            include: {
              favoriteProducts: {
                orderBy: { createdAt: 'desc' },
                select: {
                  id: true,
                },
              },
            },
          },
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

      const userDTO = userSessionAdapter({
        ...newUser,
        cartTotal: newUser.cart?._count.cartProducts || 0,
        favoriteProducts:
          newUser.favorite?.favoriteProducts.map((item) => item.id) || [],
      });
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
      if (!newUser) throw new Error('Failed to create user using Google.');
      const userDTO = userSessionAdapter({
        ...newUser,
        cartTotal: 0,
        favoriteProducts: [],
      });
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
    }
    return NextResponse.redirect(new URL(NEXT_PUBLIC_SERVER_DOMAIN_URL));
  } catch (error) {
    console.log(`[GOOGLE CALLBACK USER] server error ${error}`);
    // redirect('/');
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.log('errorMessage', errorMessage);
    return NextResponse.redirect(
      new URL(`${NEXT_PUBLIC_SERVER_DOMAIN_URL}?toastMessage=${errorMessage}`)
    );
  }
}
