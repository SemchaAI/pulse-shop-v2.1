import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from './utils/helpers';
export default async function middleware(req: NextRequest) {
  console.log('middleware');
  const { user, message } = await getServerSession();
  console.log('data', user, message);
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
export const config = {
  matcher: ['/profile', '/protected/:path*'],
};
