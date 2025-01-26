import { prisma } from '@/prisma/prismaClient';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const activationLink = req.nextUrl.searchParams.get('link');
  try {
    if (!activationLink) {
      throw new Error('Activation link not found');
    }

    const code = await prisma.verificationCode.findFirst({
      where: {
        code: activationLink,
      },
    });
    if (!code) {
      throw new Error('Activation code not found');
    }

    const user = await prisma.user.update({
      where: { id: code.userId },
      data: {
        verified: new Date(),
      },
    });
    if (!user) {
      throw new Error('User not found 2');
    }

    await prisma.verificationCode.delete({
      where: { id: code.id },
    });
    // const cookieStore = await cookies();
    // cookieStore.delete('newUser');
    return NextResponse.redirect(new URL('/login', req.url));
  } catch (error) {
    console.log(`[ACTIVATE USER] server error ${error}`);
    throw error;
  }
}
