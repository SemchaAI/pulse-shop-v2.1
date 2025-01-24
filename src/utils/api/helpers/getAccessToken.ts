export async function getAccessToken(): Promise<string | null> {
  const cookieStore = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='));
  return cookieStore ? cookieStore.split('=')[1] : null;
}
