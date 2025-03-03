import { EntityBlock } from '@/components/shared';
import { CartProduct } from './CartProduct';
import type { ICartSliceData } from '@/models/cart';

interface IProps {
  cart: ICartSliceData;
  children?: React.ReactNode;
  className?: string;
}

export const CartList = ({ cart, children, className }: IProps) => {
  return (
    <EntityBlock className="flex-grow">
      <ul
        className={`${className} flex flex-col items-center gap-2 flex-grow p-0 overflow-y-auto overflow-x-hidden custom-scrollbar`}
      >
        {cart &&
          cart.cartProducts.map((product, index) => (
            <CartProduct
              key={product.id}
              index={index}
              item={product}
            />
          ))}
      </ul>
      {children}
    </EntityBlock>
  );
};
