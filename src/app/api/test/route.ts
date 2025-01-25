import { authMiddleware } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  // If the middleware returns an error response, forward it
  if (authResponse.status !== 200) return authResponse;
  return NextResponse.json({ message: 'Authorized access!' }, { status: 200 });
}
