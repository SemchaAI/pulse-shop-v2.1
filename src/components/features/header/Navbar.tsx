import { NavLink } from '@/components/shared';
import { HeaderNav } from '@/utils/consts';

export const Navbar = () => {
  return (
    <nav
      className="hidden lg:block relative first-line:flex grow overflow-hidden duration-500  
    lg:w-auto lg:top-auto lg:h-auto"
    >
      <ul className="flex gap-4 grow justify-center flex-row">
        {HeaderNav.map(({ name, href }) => (
          <li key={name}>
            <NavLink
              className="flex justify-center"
              href={href}
            >
              {name}
            </NavLink>
          </li>
        ))}
        {/* <li className="lg:flex lg:justify-center">
          <NavLink href="#">Products</NavLink>
        </li>
        <li className="lg:flex lg:justify-center">
          <NavLink href="#">About</NavLink>
        </li>
        <li className="lg:flex lg:justify-center">
          <NavLink href="#">admin</NavLink>
        </li> */}
      </ul>
    </nav>
  );
};
