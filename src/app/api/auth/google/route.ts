import { API_ROUTES, GOOGLE_ID, GOOGLE_SECRET } from '@/utils/consts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!GOOGLE_SECRET || !GOOGLE_ID)
      throw new Error('GOOGLE_ENV is not defined');

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      url: rootUrl,
      redirect_uri: API_ROUTES.GOOGLE_CALLBACK,
      clientSecret: GOOGLE_SECRET,
      client_id: GOOGLE_ID,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      accessType: 'offline',
      response_type: 'code',
    };

    const qs = new URLSearchParams(options);
    return NextResponse.redirect(new URL(`${rootUrl}?${qs.toString()}`));
  } catch (error) {
    console.log(`[GET GOOGLE USER] server error ${error}`);
    throw error;
  }
}
