'use server';
import { prisma } from '@/prisma/prismaClient';
import type { ILoginForm } from '@/models/forms';
import { generateTokens } from '@/utils';
// import { IUserSession } from '@/models/auth';
import { cookies } from 'next/headers';
import { userSessionAdapter } from '@/utils/helpers';

export async function handleCredentialsLogin(body: ILoginForm) {
  const { emailOrName, password } = body;

  if (!emailOrName || !password) {
    return { error: 'Invalid transferred data' };
  }

  const userByEmailOrName = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrName }, { name: emailOrName }],
    },
  });
  if (!userByEmailOrName) {
    return { error: 'User with this email/name doesn`t exist' };
  }

  // const userSession: IUserSession = {
  //   id: userByEmailOrName.id,
  //   name: userByEmailOrName.name,
  //   role: userByEmailOrName.role,
  //   email: userByEmailOrName.email,
  // };
  const userSession = userSessionAdapter(userByEmailOrName);

  const { refreshToken, accessToken } = await generateTokens(userSession);

  if (!refreshToken || !accessToken) {
    return { error: 'Tokens not created' };
  }

  const cookieStore = await cookies();

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

  const response = {
    message: 'User logged in successfully',
    userSession,
    accessToken,
  };

  return response;
}
