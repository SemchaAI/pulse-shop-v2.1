import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { favoriteHelper, getServerSession } from '@/utils/helpers';

export async function GET() {
  try {
    const { user } = await getServerSession(); // Get user session

    if (!user)
      return NextResponse.json(
        { favoriteProducts: [], message: 'User not found' },
        { status: 401 }
      );
    const res = await prisma.favorite.findFirst({
      where: { userId: user.id },
      include: {
        favoriteProducts: {
          orderBy: { createdAt: 'desc' },
          include: {
            images: {
              take: 1,
              where: {
                isMain: true,
              },
            },
          },
        },
      },
    });

    if (!res)
      return NextResponse.json(
        { favoriteProducts: [], message: 'Favorite not found' },
        { status: 200 }
      );

    return NextResponse.json(
      { favoriteProducts: res.favoriteProducts, message: 'Success' },
      { status: 200 }
    ); // Respond with the cart data
  } catch (error) {
    console.error('Error fetching favorite:', error);
    return NextResponse.json(
      { favoriteProducts: [], message: 'Error fetching favorite' },
      { status: 500 } // Return error response with a status code
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    //message
    const { status, user } = await getServerSession();
    if (status === 401)
      return NextResponse.json(
        { message: 'Auth error', favoriteProducts: [] },
        { status }
      );
    if (!user)
      return NextResponse.json(
        { message: `Only for authenticated users`, favoriteProducts: [] },
        { status: 200 }
      );

    const userFavorite = await favoriteHelper(user.id);
    //quantity
    const { productVariantId } = await req.json();
    console.log('productVariantId', productVariantId, userFavorite.id);
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        id: userFavorite.id,
        favoriteProducts: {
          some: { id: productVariantId },
        },
      },
    });
    console.log('existingFavorite', existingFavorite);
    let updatedFavorite;
    if (existingFavorite) {
      updatedFavorite = await prisma.favorite.update({
        where: { id: userFavorite.id },
        data: {
          favoriteProducts: {
            disconnect: { id: productVariantId }, // Remove the variant
          },
        },
        include: { favoriteProducts: true },
      });
    } else {
      updatedFavorite = await prisma.favorite.update({
        where: { id: userFavorite.id },
        data: {
          favoriteProducts: {
            connect: { id: productVariantId }, // Add the variant
          },
        },
        include: { favoriteProducts: true },
      });
    }
    const toggleMessage = !existingFavorite
      ? 'Item added to favorite'
      : 'Item removed from favorite';
    return NextResponse.json({
      message: toggleMessage,
      favoriteProducts: updatedFavorite.favoriteProducts.map((item) => item.id),
    });
  } catch (error) {
    console.log('[FAVORITE_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create favorite', favoriteProducts: [] },
      { status: 500 }
    );
  }
}
