import type { GoogleTokensResult } from '@/models/auth';
import { API_ROUTES, GOOGLE_ID, GOOGLE_SECRET } from '@/utils/consts';

export async function getGoogleToken(
  code: string
): Promise<GoogleTokensResult> {
  const searchParams = new URLSearchParams({
    client_id: GOOGLE_ID as string,
    client_secret: GOOGLE_SECRET as string,
    code: code as string,
    redirect_uri: API_ROUTES.GOOGLE_CALLBACK,
    grant_type: 'authorization_code',
  });
  // Exchange authorization code for access token
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: searchParams.toString(),
    });
    const tokenResponseJson: GoogleTokensResult = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.log('response error', tokenResponseJson);
      throw new Error(`HTTP error! status: ${tokenResponse.status}`);
    }
    return tokenResponseJson;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to get Google token');
  }
}
