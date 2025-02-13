import type { ICartResponse } from '@/models/cart';
import { prisma } from '@/prisma/prismaClient';

export const updateCartTotalAmount = async (
  userId: number
): Promise<ICartResponse | undefined> => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
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

  if (!cart) return;

  const totalAmount = cart.cartProducts.reduce((acc, item) => {
    return acc + item.productVariant.price * item.quantity;
  }, 0);

  const cartData = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      totalAmount,
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
              images: {
                where: {
                  isMain: true,
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });
  return {
    totalAmount,
    cartProducts: cartData.cartProducts,
    cartTotal: cartData.cartProducts.length,
  };
};
