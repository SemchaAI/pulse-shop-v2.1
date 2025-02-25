'use server';
import { prisma } from '@/prisma/prismaClient';

export const getFavoriteIds = async (userId: number): Promise<number[]> => {
  let favoriteProducts: number[] = [];
  const res = await prisma.favorite.findFirst({
    where: { userId },
    include: {
      favoriteProducts: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
        },
      },
    },
  });
  if (res) favoriteProducts = res.favoriteProducts.map((item) => item.id);
  return favoriteProducts;
};
