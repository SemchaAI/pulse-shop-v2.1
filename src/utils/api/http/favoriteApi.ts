import { API_ROUTES } from '@/utils/consts';
import { customFetch } from '../helpers/customFetch';
import { ISearchProductVariant } from '@/models/prisma';
interface IAddResponse {
  message: string;
  favoriteProducts: number[];
}
interface IGetResponse {
  message: string;
  favoriteProducts: ISearchProductVariant[];
}
export const getFavorite = async (): Promise<IGetResponse> => {
  try {
    const res = await customFetch(API_ROUTES.FAVORITE);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const favorite = await res.json();
    return favorite;
  } catch (error) {
    console.log('[GET FAVORITE]:', error);
    throw new Error('[GET FAVORITE]: Something went wrong');
  }
};

export const addToFavorite = async (
  productVariantId: number
): Promise<IAddResponse> => {
  try {
    const res = await customFetch(API_ROUTES.FAVORITE, {
      method: 'POST',
      body: JSON.stringify({ productVariantId }),
    });
    if (!res.ok) throw new Error('Failed to add item');
    const favorite = await res.json();
    return favorite;
  } catch (error) {
    console.log('[ADD TO FAVORITE]:', error);
    throw new Error('[ADD TO FAVORITE]: Something went wrong');
  }
};
