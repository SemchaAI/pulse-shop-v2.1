'use client';
import { NavLink } from '@/components/shared';
import { HeaderNav } from '@/utils/consts';
import { useRef } from 'react';

interface IProps {
  isMenuOpen: boolean;
}

export const MobileNavbar = ({ isMenuOpen }: IProps) => {
  const contentRef = useRef<HTMLUListElement>(null);

  //24-height of one item , 16 gap, 80 padding(40+40)
  const height = HeaderNav.length * 24 + 16 * (HeaderNav.length - 1) + 80;

  return (
    <nav
      className="flex grow fixed left-0 top-[65px] w-full bg-foreground transition-all overflow-hidden duration-500"
      style={isMenuOpen ? { maxHeight: `${height}px` } : { maxHeight: 0 }}
    >
      <ul
        className="w-full flex flex-col gap-4 px-5 py-10"
        ref={contentRef}
      >
        {HeaderNav.map(({ name, href }) => (
          <li
            className="flex bg-background"
            key={name}
          >
            <NavLink
              className="group relative uppercase w-full text-center"
              href={href}
            >
              {name}
              <span
                className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-primary 
                   scale-x-0 origin-bottom-right transition-transform duration-300 
                   group-hover:scale-x-100 group-hover:origin-bottom-left"
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
