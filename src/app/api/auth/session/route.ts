import { prisma } from '@/prisma/prismaClient';
import { NextResponse } from 'next/server';

import { getServerSession, userSessionAdapter } from '@/utils/helpers';

export async function GET() {
  try {
    const { user: userData, message, status } = await getServerSession();
    if (!userData && status === 200) {
      return NextResponse.json({ user: null, message }, { status });
    }
    if (!userData || status !== 200) {
      return NextResponse.json({ user: null, message }, { status });
    }

    const user = await prisma.user.findUnique({
      where: { id: userData.id },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const filteredUser = userSessionAdapter(user);

    return NextResponse.json({ user: filteredUser, message }, { status: 200 });
  } catch (error) {
    console.log(`[GET USER] server error ${error}`);
    throw error;
  }
}
