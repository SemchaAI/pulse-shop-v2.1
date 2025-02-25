import { prisma } from '@/prisma/prismaClient';
import {
  getCartDetails,
  getServerSession,
  updateCartTotalAmount,
} from '@/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('ID', id);

    const data = (await req.json()) as { quantity: number };
    if (data.quantity < 1)
      return NextResponse.json(
        { message: 'Invalid quantity' },
        { status: 400 }
      );
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'User cart not found' },
        { status: 404 }
      );
    }

    const cartProduct = await prisma.cartProduct.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!cartProduct) {
      return NextResponse.json(
        { message: 'Cart product not found' },
        { status: 404 }
      );
    }

    await prisma.cartProduct.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    });
    const updatedCart = await updateCartTotalAmount(session.user.id);
    if (!updatedCart)
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    const flatCart = getCartDetails(updatedCart);
    return NextResponse.json(flatCart);
  } catch (error) {
    console.log('[CART_PATCH] Something went wrong', error);
    return NextResponse.json(
      { message: 'Something went wrong while updating cart' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('ID', id);
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const cartProduct = await prisma.cartProduct.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!cartProduct) {
      return NextResponse.json(
        { message: 'Cart product not found' },
        { status: 404 }
      );
    }

    await prisma.cartProduct.delete({
      where: {
        id: Number(id),
      },
    });
    const updatedCart = await updateCartTotalAmount(session.user.id);
    if (!updatedCart)
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    const flatCart = getCartDetails(updatedCart);
    return NextResponse.json(flatCart);
  } catch (error) {
    console.log('[CART_DELETE] Something went wrong', error);
    return NextResponse.json(
      { message: 'Something went wrong while delete cart product' },
      { status: 500 }
    );
  }
}
