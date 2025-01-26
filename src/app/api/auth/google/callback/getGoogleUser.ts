import type { GoogleUserResult } from '@/models/auth';

interface IGoogleErrorResponse {
  message: string;
  status: string;
  code: number;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Error fetching Google user info:', await response.json());
      // throw new Error(`HTTP error! Status: ${response.status}`);
      throw new Error(
        `Error fetching Google user info status: ${response.status}`
      );
    }

    const data: GoogleUserResult = await response.json();
    return data;
  } catch (error) {
    console.log(error, 'Error fetching Google user');
    const { message } = error as IGoogleErrorResponse;
    throw new Error(message);
  }
}
