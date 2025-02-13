import { IUserSession } from '@/models/auth';
import { prisma } from '@/prisma/prismaClient';
import { generateTokens } from '@/utils';
import { JWT_REFRESH } from '@/utils/consts';
import { userSessionAdapter } from '@/utils/helpers';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

interface IRefreshTokenResponse {
  refreshToken: string | null;
  accessToken: string | null;
  message: string;
}
export async function POST(
  req: NextRequest
): Promise<NextResponse<IRefreshTokenResponse | null>> {
  const { refreshToken: token } = await req.json();
  if (!JWT_REFRESH || !token) {
    console.error('Server configuration error: Missing JWT secrets');
    return NextResponse.json(
      {
        refreshToken: null,
        accessToken: null,
        message: 'Server configuration error',
      },
      { status: 500 }
    );
  }

  try {
    const refreshSecret = new TextEncoder().encode(JWT_REFRESH);
    const { payload } = await jwtVerify(token, refreshSecret);
    const userData = payload as unknown as IUserSession;

    // Check if the user exists and issue a new access token
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!user) {
      return NextResponse.json(
        {
          refreshToken: null,
          accessToken: null,
          message: 'User not found',
        },
        { status: 404 }
      );
    }
    //adapt user to session
    const userSession = userSessionAdapter(user);

    const { refreshToken, accessToken } = await generateTokens(userSession);

    return NextResponse.json(
      {
        refreshToken,
        accessToken,
        message: 'Tokens refreshed',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error refreshing token:', err);
    return NextResponse.json(
      {
        refreshToken: null,
        accessToken: null,
        message: `Error refreshing token ${err}`,
      },
      { status: 500 }
    );
  }
}
