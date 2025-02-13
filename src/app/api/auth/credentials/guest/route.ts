'use server';
import { IUserSession } from '@/models/auth';
import { prisma } from '@/prisma/prismaClient';
import { generateTokens } from '@/utils';
import { userSessionAdapter } from '@/utils/helpers';
import { Role } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export interface IGuestData {
  userSession: IUserSession;
  refreshToken: string;
  accessToken: string;
}

export async function GET(): Promise<NextResponse<IGuestData>> {
  try {
    const uuid = randomUUID();
    const newUser = await prisma.user.create({
      data: {
        name: `Guest ${uuid}`,
        email: `guest@${uuid}.pulse`,
        password: hashSync(randomUUID(), 10),

        verified: new Date(),
        role: Role.GUEST,
      },
    });
    //adapt here to see in development errors
    //if i will change basic session data
    const userSession = userSessionAdapter(newUser);
    const { refreshToken, accessToken } = await generateTokens(userSession);

    if (!refreshToken || !accessToken) {
      throw Error('Tokens not created');
      // return NextResponse.json(
      //   { message: 'Tokens not created' },
      //   { status: 500 }
      // );
    }

    return NextResponse.json(
      { userSession, refreshToken, accessToken },
      { status: 200 }
    );
  } catch (error) {
    console.log(`[GUEST USER] server error ${error}`);
    throw error;
  }
}
