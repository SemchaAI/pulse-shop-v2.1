'use server';

import { NextRequest, NextResponse } from 'next/server';
import { validateAccessToken } from './jwt';

export async function authMiddleware(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get('Authorization');

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: 'Unauthorized: Missing Authorization header' },
        { status: 401 }
      );
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: Missing Access Token' },
        { status: 401 }
      );
    }

    const userData = await validateAccessToken(accessToken);
    if (!userData) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid Access Token' },
        { status: 401 }
      );
    }

    console.log('User authenticated:', userData);

    const response = NextResponse.next();
    // response.headers.set('X-User-Id', userData.id);
    // response.headers.set('X-User-Role', userData.role);

    return response;
  } catch (error) {
    console.log('Auth Middleware Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
