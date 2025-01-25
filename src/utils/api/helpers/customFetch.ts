import { API_ROUTES } from '@/utils/consts';
import { getAccessToken } from './getAccessToken';

type FetchOptions = RequestInit & { retry?: boolean }; // Add a custom "retry" flag

export async function customFetch(url: string, options: FetchOptions = {}) {
  const token = await getAccessToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, { ...options, headers });
    // Response Interceptor Logic
    if (response.status === 401 && options.retry !== false) {
      //
      const data = await fetch(API_ROUTES.REFRESH); //
      const { accessToken } = await data.json();
      if (accessToken) {
        // Retry the original request with the new token
        return await customFetch(url, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          retry: false, // Prevent infinite retries
        });
      } else {
        throw new Error('Failed to refresh token');
      }
    }

    if (!response.ok) {
      // Handle other HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Something went wrong';
    console.log('CUSTOM FETCH', msg);
    throw error;
  }
}
