'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: IProps) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${
        path.startsWith(href) ? 'text-primary' : 'text-text-primary'
      }`}
    >
      {children}
    </Link>
  );
};
