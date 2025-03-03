import { prisma } from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/utils/helpers';

export async function POST(req: NextRequest) {
  try {
    const { user: userData, message } = await getServerSession();
    if (!userData) {
      return NextResponse.json({ message }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const data = await req.json();

    //some validation here
    if (
      !data ||
      !data.name ||
      !data.firstName ||
      !data.lastName ||
      !data.email
    ) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }
    //extra validation here

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      },
    });
    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(`[GET USER] server error ${error}`);
    throw error;
  }
}
