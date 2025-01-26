'use server';
import { NextRequest, NextResponse } from 'next/server';
import { hashSync } from 'bcryptjs';
import { randomUUID } from 'crypto';

import { prisma } from '@/prisma/prismaClient';
import { Role } from '@prisma/client';

import { sendActivationMail } from '@/utils';
import { NEXT_PUBLIC_SERVER_URL } from '@/utils/consts';
import { getServerSession } from '@/utils/helpers';

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();
  if (!email || !name || !password) {
    return NextResponse.json(
      { message: 'Invalid transferred data' },
      { status: 403 }
    );
  }
  const findUserByEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (findUserByEmail) {
    return NextResponse.json(
      { message: 'User with this email already exists' },
      { status: 403 }
    );
  }
  const { user } = await getServerSession();
  let newUser;

  if (!user) {
    newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashSync(password, 10),
        role: 'USER' as Role,
      },
    });
  } else if (user.role === 'GUEST') {
    newUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        email: email,
        password: hashSync(password, 10),
        role: 'USER' as Role,
      },
    });
  } else {
    return NextResponse.json(
      { message: 'You are already signed in' },
      { status: 403 }
    );
  }

  const verificationCode = await prisma.verificationCode.create({
    data: {
      code: randomUUID(),
      userId: newUser.id,
    },
  });
  if (!verificationCode) {
    return NextResponse.json(
      { message: 'Error creating verification code' },
      { status: 500 }
    );
  }

  const activationUrl = `${NEXT_PUBLIC_SERVER_URL}/auth/activation?link=${verificationCode.code}`;
  await sendActivationMail(newUser.email, activationUrl);
  return NextResponse.json(
    { message: 'User registered successfully' },
    { status: 200 }
  );
}
