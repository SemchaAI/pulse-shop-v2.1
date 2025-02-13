'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';

import { ThemeSwitcher } from '@/components/features';
import { CountBadge } from '@/components/shared';

import { useAppSelector } from '@/utils/hooks';

import type { IUserSession } from '@/models/auth';

interface IProps {
  // cart: ICartResponse;
  user: IUserSession | null;
  // favorite: null;
}
export const HeaderControls = ({ user }: IProps) => {
  console.log('HeaderControls');
  const cartSelector = useAppSelector((state) => state.cart);
  console.log('cartSelector', cartSelector);
  // console.log('HeaderControls', cart, user, favorite);
  // useEffect(() => {
  //   if (cart && cart.cartProducts.length > 0) {
  //     console.log('cart', cart);
  //     dispatch(initCart(getCartDetails(cart)));
  //   }
  // }, [cart.cartProducts]);

  // const { data: user, status } = useSession();
  // useCriticalData(status);
  // const { cartProducts, loading, cartTotal, error, totalAmount } =
  //   useAppSelector((state) => state.cart);

  // const cartCount = cartProducts?.length ?? 0;

  return (
    <div className="flex justify-center items-center gap-4 w-full p-3 border-t border-primary lg:w-min lg:justify-end lg:p-0 lg:border-0">
      <button
        type="button"
        className="w-6 flex"
      >
        <Search size={24} />
      </button>
      <Link
        className="w-6 relative"
        href="/cart"
      >
        <ShoppingCart size={24} />
        {cartSelector.cartTotal > 0 && (
          <CountBadge
            key={cartSelector.cartTotal}
            totalItems={cartSelector.cartTotal}
          />
        )}
      </Link>
      <Link
        className="w-6"
        href="/favorite"
      >
        <Heart size={24} />
      </Link>
      <ThemeSwitcher />
      {user && user?.role !== 'GUEST' ? (
        <Link
          className="w-6"
          href="/profile"
        >
          <Image
            src={user.avatar || '/images/avatar.svg'}
            alt={user.name || 'User avatar'}
            width={24}
            height={24}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link
          className="w-6"
          href="/login"
        >
          <User size={24} />
        </Link>
      )}
    </div>
  );
};

{
  /* <div className="flex justify-center items-center gap-4 w-full p-3 border-t border-primary lg:w-min lg:justify-end lg:p-0 lg:border-0">
<button
  type="button"
  className="w-6 flex"
>
  <Search size={24} />
</button>
<Link
  className="w-6 relative"
  href="/cart"
>
  <ShoppingCart size={24} />a
  {loading && (
    <Loader2
      size={16}
      className="absolute -top-1 -right-1 animate-spin"
    />
  )}
  {user && cartCount > 0 && <CountBadge totalItems={cartCount} />}
</Link>
<Link
  className="w-6"
  href="/favorite"
>
  <Heart size={24} />
</Link>
<ThemeSwitcher />
{user ? (
  <Link
    className="w-6"
    href="/profile"
  >
    <Image
      src={user.avatar || '/images/avatar.svg'}
      alt={user.name || 'User avatar'}
      width={24}
      height={24}
      className="rounded-full"
    />
  </Link>
) : status === 'loading' ? (

  <Skeleton
    width="24px"
    height="24px"
    borderRadius="50%"
  />
) : (
  <Link
    className="w-6"
    href="/login"
  >
    <User size={24} />
  </Link>
)}
</div> */
}
