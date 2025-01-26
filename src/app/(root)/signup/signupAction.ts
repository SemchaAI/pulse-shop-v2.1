// 'use server';
// import { prisma } from '@/prisma/prismaClient';
// import { hashSync } from 'bcryptjs';
// import { randomUUID } from 'crypto';
// import { Role } from '@prisma/client';

// import type { CredentialsSignupBody } from '@/models/auth';
// import { getServerSession } from '@/utils/helpers';
// import { NEXT_PUBLIC_SERVER_URL } from '@/utils/consts';
// import { sendActivationMail } from '@/utils';
// import { NextResponse } from 'next/server';

// let guestCounter = 0;
// export async function handleGuestSignup(token: string | undefined) {
//   // const session = req.cookies.get('refreshToken')?.value;
//   if (token) {
//     const decodedSession = validateRefreshToken(token);
//     console.log(decodedSession);
//     if (decodedSession) {
//       // return NextResponse.json(
//       //   { message: 'Already signed in as a guest', session: decodedSession },
//       //   { status: 200 }
//       // );
//       throw new Error('Already signed in as a guest');
//     }
//   }

//   const guestId = guestCounter++;

//   const guestUser = await prisma.user.create({
//     data: {
//       name: 'Guest_' + guestId,
//       email: `guest_${guestId}@example.com`,
//       role: 'GUEST' as Role,
//       password: hashSync(randomUUID(), 10),
//       verified: new Date(),
//     },
//   });

//   const { accessToken, refreshToken } = generateTokens({
//     id: guestUser.id,
//     name: guestUser.name,
//     role: guestUser.role,
//   } as IUserSession);

//   const response = {
//     message: 'Guest user created',
//     user: guestUser,
//     accessToken,
//   };

//   const cookieStore = await cookies();

//   cookieStore.set('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   });

//   return response;
// }

// export async function handleCredentialsSignup(body: CredentialsSignupBody) {
//   const { email, name, password } = body;

//   if (!email || !name || !password) {
//     return NextResponse.json(
//       { message: 'Invalid transferred data' },
//       { status: 400 }
//     );
//     // return { error: 'Invalid transferred data' };
//   }

//   const findUserByEmail = await prisma.user.findFirst({
//     where: { email },
//   });

//   if (findUserByEmail) {
//     return NextResponse.json(
//       { message: 'User with this email already exists' },
//       { status:  }
//     );
//     // return { error: 'User with this email already exists' };
//   }

//   // const user = await prisma.user.create({
//   //   data: {
//   //     name,
//   //     email,
//   //     password: hashSync(password, 10),
//   //     role: 'USER' as Role,
//   //   },
//   // });
//   // if (!user) {
//   //   return { error: 'User not created' };
//   // }

//   const { user } = await getServerSession();
//   let newUser;

//   if (!user) {
//     newUser = await prisma.user.create({
//       data: {
//         name: body.name,
//         email: body.email,
//         password: hashSync(body.password, 10),
//         role: 'USER' as Role,
//       },
//     });
//   } else if (user.role === 'GUEST') {
//     newUser = await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         name: body.name,
//         email: body.email,
//         password: hashSync(body.password, 10),
//         role: 'USER' as Role,
//       },
//     });
//   } else {
//     return { message: 'User already exists', success: false };
//   }

//   const verificationCode = await prisma.verificationCode.create({
//     data: {
//       code: randomUUID(),
//       userId: newUser.id,
//     },
//   });
//   if (!verificationCode) {
//     throw new Error('Code not created');
//   }

//   const activationUrl = `${NEXT_PUBLIC_SERVER_URL}/auth/activation?link=${verificationCode.code}`;
//   await sendActivationMail(newUser.email, activationUrl);
//   return { message: 'User registered successfully', success: true };
// }
