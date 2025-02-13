'use server';
// import type { ICartResponse } from '@/models/cart';
import { prisma } from '@/prisma/prismaClient';
import { getServerSession } from '@/utils/helpers';

// interface IProps {
//   cartTotal: number;
//   favoriteTotal: number;
// }

export const getCriticalData = async () => {
  const { user } = await getServerSession();
  let cartTotal = 0;
  const favoriteTotal = 0;
  if (user) {
    try {
      const [cartData] = await prisma.$transaction([
        prisma.cart.findFirst({
          where: {
            userId: user.id,
          },
          include: {
            _count: {
              select: { cartProducts: true },
            },
          },
        }),
      ]);
      if (cartData) {
        cartTotal = cartData._count.cartProducts;
      }
      // if (favoriteData) {
      //   favorite = {
      //     favoriteProducts: favoriteData.favoriteProducts,
      //     favoriteTotal: favoriteData.favoriteProducts.length,
      //   };
      // }
    } catch (error) {
      console.log('error', error);
    }
  }
  console.log('RootLayout');
  return { user, cartTotal, favoriteTotal };
};

// interface IProps {
//   cart: ICartResponse;
// }

// export const getCriticalData = async () => {
//   const { user } = await getServerSession();
//   let cart: IProps['cart'] = { cartProducts: [], totalAmount: 0, cartTotal: 0 };
//   const favorite = { favoriteProducts: [], favoriteTotal: 0 };
//   if (user) {
//     try {
//       const [cartData] = await prisma.$transaction([
//         prisma.cart.findFirst({
//           where: {
//             userId: user.id,
//           },
//           include: {
//             cartProducts: {
//               orderBy: {
//                 createdAt: 'desc',
//               },
//               include: {
//                 productVariant: {
//                   include: {
//                     product: true,
//                     color: true,
//                     memory: true,
//                     ram: true,
//                     images: {
//                       where: {
//                         isMain: true,
//                       },
//                       take: 1,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         }),
//         // prisma.favorite.findFirst({
//         //   where: {
//         //     userId: user.id,
//         //   },
//         //   include: {
//         //     favoriteProducts: {
//         //       orderBy: {
//         //         createdAt: 'desc',
//         //       },
//         //       include: {
//         //         productVariant: {
//         //           include: {
//         //             product: true,
//         //             color: true,
//         //             memory: true,
//         //             ram: true,
//         //           },
//         //         },
//         //       },
//         //     },
//         //   },
//         // }),
//       ]);
//       if (cartData) {
//         cart = {
//           cartProducts: cartData.cartProducts,
//           totalAmount: cartData.totalAmount,
//           cartTotal: cartData.cartProducts.length,
//         };
//       }
//       // if (favoriteData) {
//       //   favorite = {
//       //     favoriteProducts: favoriteData.favoriteProducts,
//       //     favoriteTotal: favoriteData.favoriteProducts.length,
//       //   };
//       // }
//     } catch (error) {
//       console.log('error', error);
//     }
//   }
//   console.log('RootLayout');
//   return { user, cart, favorite };
// };
