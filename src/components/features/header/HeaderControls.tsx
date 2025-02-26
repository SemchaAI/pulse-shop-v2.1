'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { ThemeSwitcher } from '@/components/features';
import { CountBadge } from '@/components/shared';

import { useAppDispatch, useAppSelector, useSession } from '@/utils/hooks';
import { useEffect, useRef } from 'react';
import { initUserData } from '@/redux/global';
import { Search } from '@/components/widgets';

export const HeaderControls = () => {
  console.log('HeaderControls');
  const { data: user } = useSession();
  const cart = useAppSelector((state) => state.cart);
  const favorite = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!user || hasInitialized.current) return;
    dispatch(initUserData(user));
    hasInitialized.current = true;
  }, [user, dispatch]);
  const favoriteTotal = favorite.favoriteProducts.length;

  return (
    <div className="flex grow justify-end items-center gap-4 p-3 lg:w-min lg:grow-0 lg:justify-end lg:p-0 lg:border-0">
      <Search />
      <Link
        className="w-6 relative"
        href="/cart"
        aria-label="cart page"
      >
        <ShoppingCart size={24} />
        {cart.cartTotal > 0 && (
          <CountBadge
            key={cart.cartTotal}
            totalItems={cart.cartTotal}
          />
        )}
      </Link>
      {user && user.role !== 'GUEST' ? (
        <Link
          className="w-6 relative"
          href="/favorite"
          aria-label="favorite page"
        >
          <Heart size={24} />
          {user && favoriteTotal > 0 && (
            <CountBadge
              key={favoriteTotal}
              totalItems={favoriteTotal}
            />
          )}
        </Link>
      ) : (
        <Link
          className="w-6 relative"
          href="?toastMessage=Only for registered users"
          aria-label="favorite page"
        >
          <Heart size={24} />
        </Link>
      )}
      <ThemeSwitcher />
      {user && user.role !== 'GUEST' ? (
        <Link
          className="w-6"
          href="/profile"
          aria-label="profile page"
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
          aria-label="login page"
        >
          <User size={24} />
        </Link>
      )}
    </div>
  );
};

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
