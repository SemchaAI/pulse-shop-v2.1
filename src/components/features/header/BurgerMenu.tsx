import { Menu, X } from 'lucide-react';

interface IProps {
  onClick?: () => void;
  isMenuOpen: boolean;
}

export const BurgerMenu = ({ isMenuOpen, onClick }: IProps) => {
  return (
    <button
      aria-label="open menu"
      onClick={onClick}
      className="relative w-6 h-6 flex justify-center visible overflow-hidden lg:invisible lg:w-0"
    >
      <Menu
        size={24}
        className={`absolute inset-0 transition-all duration-700  ${
          isMenuOpen
            ? 'scale-0 opacity-0 rotate-180'
            : 'scale-100 opacity-100 rotate-0'
        }`}
      />
      <X
        size={24}
        className={`absolute inset-0 transition-all duration-700 ${
          isMenuOpen
            ? 'scale-100 opacity-100 rotate-0'
            : 'scale-0 opacity-0 rotate-180'
        }`}
      />
    </button>
  );
};
