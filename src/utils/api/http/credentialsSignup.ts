import { ApiResponse } from '@/models/auth';
import { IRegistrationForm } from '@/models/forms';
import { API_ROUTES } from '@/utils/consts';

type CredentialsSignupBody = Omit<IRegistrationForm, 'confirmPassword'>;

export async function credentialsSignup(
  body: CredentialsSignupBody
): Promise<ApiResponse> {
  try {
    const res = await fetch(API_ROUTES.CREDENTIALS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData: ApiResponse = await res.json();
      throw new Error(errorData.message);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}
