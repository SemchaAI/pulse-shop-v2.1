'use server';
import { prisma } from '@/prisma/prismaClient';
import { getServerSession } from '@/utils/helpers';
import type { ICheckoutForm } from '@/models/forms';
import { OrderStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { sendOrderMail } from '@/utils/mail';

export const userData = async () => {
  const { user } = await getServerSession();
  if (!user) return null;
  const res = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      name: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
    },
  });
  return res;
};

export async function createOrder(data: ICheckoutForm) {
  try {
    const { user } = await getServerSession();
    // const cookiesStore = cookies();
    // const token = cookiesStore.get('token')?.value;

    if (!user) {
      throw new Error('User not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartProducts: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        userId: Number(user.id),
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.textarea,

        totalAmount: userCart.totalAmount,
        userId: userCart.userId,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartProducts),
      },
    });
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartProduct.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //todo link CheckoutPayment to order

    // const paymentData = await createPayment({
    //   amount: userCart.totalAmount,
    //   orderId: order.id,
    //   description: 'Payment for order #' + order.id,
    // });

    // if (!paymentData) {
    //   throw new Error('Payment not created');
    // }
    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.id,
    //   },
    // });

    // const paymentUrl = paymentData.confirmation.confirmation_url;

    const updPayment = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: randomUUID(),
      },
    });

    const paymentUrl = `http://localhost:3000/checkout?paymentId=${updPayment.paymentId}`;
    //----------------------------------

    const orderMail = await sendOrderMail({
      email: data.email,
      orderId: order.id,
      totalAmount: userCart.totalAmount,
      link: paymentUrl,
    });

    if (!orderMail.accepted) {
      throw new Error('Order mail not sent');
    }

    return paymentUrl;
  } catch (error) {
    console.log(`[CREATE ORDER] server error ${error}`);
  }
}
