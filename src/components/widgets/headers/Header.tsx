'use client';
import Link from 'next/link';
import { Activity, X } from 'lucide-react';
import { useState } from 'react';

import { Container, NavLink } from '@/components/shared';
import { useScrollControl } from '@/utils/hooks';
// import { HeaderControls } from './HeaderControls';

export const Header = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollControl(isMenuOpen);
  function clickHandler() {
    setIsMenuOpen((prev) => !prev);
  }

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
            {children}
          </div>
          <div className="flex visible bg-primary lg:invisible lg:w-0">
            <button onClick={clickHandler}>Burger</button>
          </div>
        </div>
      </Container>
    </header>
  );
};
