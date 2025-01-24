import { API_ROUTES } from '@/utils/consts';
import { getAccessToken } from './getAccessToken';

type FetchOptions = RequestInit & { retry?: boolean }; // Add a custom "retry" flag

export async function customFetch(url: string, options: FetchOptions = {}) {
  // Request Interceptor Logic
  const token = await getAccessToken(); // Get the access token from cookies or storage
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Add Authorization header
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, { ...options, headers });
    // Response Interceptor Logic
    if (response.status === 401 && options.retry !== false) {
      // Handle token expiration or unauthorized requests
      const data = await fetch(API_ROUTES.REFRESH); // Refresh the access token
      if (!data.ok) return;
      const newToken = await data.json();

      if (newToken) {
        // Retry the original request with the new token
        return await customFetch(url, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
          retry: false, // Prevent infinite retries
        });
      }
    }

    if (!response.ok) {
      // Handle other HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
