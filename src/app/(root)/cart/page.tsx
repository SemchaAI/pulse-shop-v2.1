import { CartSection } from '@/components/widgets';
import { ICartSliceData } from '@/models/cart';
import { prisma } from '@/prisma/prismaClient';
import { getCartDetails, getServerSession } from '@/utils/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pulse shop | Cart',
  description: 'Cart page of shop on next 14',
};

const getCart = async () => {
  const { user } = await getServerSession();
  let cart: ICartSliceData = { cartProducts: [], cartTotal: 0, totalAmount: 0 };
  if (user) {
    const res = await prisma.cart.findFirst({
      where: {
        userId: user.id,
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
    if (res) {
      cart = getCartDetails({
        cartProducts: res.cartProducts,
        totalAmount: res.totalAmount,
        cartTotal: res.cartProducts.length,
      });
    }
  }
  return cart;
};

export default async function Cart() {
  const cart = await getCart();
  // const { user, cart, favorite } = await getCriticalData();
  // const dispatch = useAppDispatch();
  // // The selector function automatically infers state as RootState.
  // const cart = useAppSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [dispatch]);

  // if (cart.loading) return <div>Loading...</div>;
  // if (cart.error) return <div>Error: {cart.error}</div>;
  return <CartSection cart={cart} />;
}
