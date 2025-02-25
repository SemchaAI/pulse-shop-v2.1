import { prisma } from '@/prisma/prismaClient';

export const favoriteHelper = async (userId: number) => {
  let userFavorite = await prisma.favorite.findFirst({
    where: {
      userId,
    },
  });

  if (!userFavorite) {
    userFavorite = await prisma.favorite.create({
      data: {
        userId,
      },
    });
  }

  return userFavorite;
};
