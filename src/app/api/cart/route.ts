import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import {
  cartHelper,
  getCartDetails,
  getServerSession,
  updateCartTotalAmount,
} from '@/utils/helpers';
import { API_ROUTES } from '@/utils/consts';
import { IUserSession } from '@/models/auth';
import { NEXT_PUBLIC_SERVER_DOMAIN_URL } from '@/utils/consts/env';
import { cookies } from 'next/headers';
import { IGuestData } from '../auth/credentials/guest/route';

export async function GET() {
  try {
    // message, status,
    const { user } = await getServerSession();
    //console.log('user', user);

    if (!user)
      return NextResponse.json({
        cartProducts: [],
        totalAmount: 0,
      });

    const userCart = await prisma.cart.findFirst({
      where: {
        userId: Number(user.id),
      },
      include: {
        cartProducts: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariant: {
              include: {
                product: true,
                color: true,
                memory: true,
                ram: true,
              },
            },
          },
        },
      },
    });
    console.log('userCart', userCart);
    if (!userCart)
      return NextResponse.json({
        cartProducts: [],
        totalAmount: 0,
      });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Cannot get cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let userData: IUserSession | null = null;
    //message
    const { status, user } = await getServerSession();
    userData = user;
    if (status === 401) return NextResponse.json('Auth error', { status });

    if (status === 200 && !user) {
      //guest
      try {
        const res = await fetch(
          NEXT_PUBLIC_SERVER_DOMAIN_URL + API_ROUTES.GUEST
        );
        const { accessToken, refreshToken, userSession } =
          (await res.json()) as IGuestData;
        const cookieStore = await cookies();
        cookieStore.set('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        cookieStore.set('accessToken', accessToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          maxAge: 60 * 15, // 15min
        });
        userData = userSession;
      } catch (error) {
        console.log(error);
        return NextResponse.json(`[GUEST] ${error}`, { status: 500 });
      }
    }

    if (!userData) return NextResponse.json('Auth error', { status: 500 });

    const userCart = await cartHelper(userData.id);
    // console.log('userCart', userCart);
    //quantity
    const { productVariantId } = await req.json();
    const findCartItem = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId,
      },
    });
    //  console.log('findCartItem', findCartItem);

    if (findCartItem) {
      await prisma.cartProduct.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartProduct.create({
        data: {
          cartId: userCart.id,
          productVariantId: productVariantId,
        },
      });
    }

    const updatedCard = await updateCartTotalAmount(userData.id);
    if (!updatedCard) throw Error;
    const flatCart = getCartDetails(updatedCard);
    const resp = NextResponse.json(flatCart);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create cart' },
      { status: 500 }
    );
  }
}
