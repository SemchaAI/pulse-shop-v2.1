'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';

import { Container, Overlay } from '@/components/shared';
import { useScrollControl } from '@/utils/hooks';
import {
  BurgerMenu,
  HeaderControls,
  MobileNavbar,
  Navbar,
} from '@/components/features';

// import { HeaderControls } from './HeaderControls';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollControl(isMenuOpen);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setIsMenuOpen(false);
  }, [pathname]);

  function clickHandler() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <>
      <header className="w-full relative z-30 border-b-[1px] border-border bg-foreground text-text-primary">
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
            <Navbar />
            <MobileNavbar isMenuOpen={isMenuOpen} />
            <HeaderControls />
            <BurgerMenu
              isMenuOpen={isMenuOpen}
              onClick={clickHandler}
            />
          </div>
        </Container>
      </header>
      {isMenuOpen && <Overlay onClick={clickHandler} />}
    </>
  );
};
