import { PaginatedResult } from '@/models/api';
import { ApiResponse } from '@/models/auth';
import type { ISearchProductVariant } from '@/models/prisma';

export async function search(
  params: string
): Promise<PaginatedResult<ISearchProductVariant>> {
  try {
    const url = `http://localhost:3000/api/search?${params}`;
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      const errorData: ApiResponse = await res.json();
      throw new Error(errorData.message);
    }
    const data: PaginatedResult<ISearchProductVariant> = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
