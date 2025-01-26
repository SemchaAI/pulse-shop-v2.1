'use client';
import Link from 'next/link';
import { Container, NavLink, Skeleton } from '@/components/shared';
import { Activity, Heart, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { useScrollControl, useSession } from '@/utils/hooks';
import { ThemeSwitcher } from '@/components/features';
import Image from 'next/image';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollControl(isMenuOpen);
  function clickHandler() {
    setIsMenuOpen((prev) => !prev);
  }
  const { data: user, status } = useSession();
  console.log('user', user, status);

  return (
    <header className="w-full bg-foreground text-text-primary relative overflow-hidden">
      <Container>
        <div className="w-full flex items-center justify-between py-2">
          <Link
            className="flex items-center gap-4"
            href="/"
          >
            <Activity size={45} />
            <div>
              <h1>Pulse shop</h1>
              <p>
                <span>Fastest</span> <span>delivery</span>
              </p>
            </div>
          </Link>
          <div
            className={`flex flex-col justify-between grow fixed items-center gap-4 right-0 top-0 w-80 h-dvh  bg-foreground z-10
              transform transition-transform  translate-y-0 lg:translate-x-0 ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }
              lg:relative lg:flex-row lg:w-auto lg:bg-transparent lg:h-auto lg:gap-0`}
          >
            <div className="flex visible w-full p-3 flex-row-reverse lg:invisible lg:w-0 lg:p-0">
              <button
                className="flex"
                onClick={clickHandler}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex grow w-full">
              <ul className="flex gap-4 grow justify-center flex-col lg:flex-row">
                <li className="lg:flex lg:justify-center">
                  <NavLink href="/products">Products</NavLink>
                </li>
                <li className="lg:flex lg:justify-center">
                  <NavLink href="/about">About</NavLink>
                </li>
                <li className="lg:flex lg:justify-center">
                  <NavLink href="/admin">admin</NavLink>
                </li>
              </ul>
            </nav>
            <div className="flex justify-center items-center gap-4 w-full p-3 border-t border-primary lg:w-min lg:justify-end lg:p-0 lg:border-0">
              <button
                type="button"
                className="w-6 flex"
              >
                <Search size={24} />
              </button>
              <Link
                className="w-6"
                href="/cart"
              >
                <ShoppingCart size={24} />
              </Link>
              <Link
                className="w-6"
                href="/cart"
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
                // <div className="w-6 h-6 aspect-square border-4 border-blue-500 border-t-transparent rounded-full" />
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
            </div>
          </div>
          <div className="flex visible w-min bg-primary lg:invisible lg:w-0">
            <button onClick={clickHandler}>Burger</button>
          </div>
        </div>
      </Container>
    </header>
  );
};
