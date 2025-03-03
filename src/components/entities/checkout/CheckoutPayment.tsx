import { EntityBlock, InfoLine } from '@/components/shared';
import type { ICartSliceData } from '@/models/cart';
import { BadgeCent, ShoppingBag, Truck } from 'lucide-react';

interface IProps {
  cart: ICartSliceData;
  children: React.ReactNode;
}

export const CheckoutPayment = ({ cart, children }: IProps) => {
  const DeliveryPrice = cart.totalAmount < 1000 ? 100 : 0;
  const cartTotal = cart.totalAmount + DeliveryPrice;
  return (
    <EntityBlock className="w-full lg:w-96 h-fit lg:sticky top-5">
      <div className="w-full flex justify-between py-1">
        <p className="typo-title-24">Total</p>
        <p>{cartTotal} MDL</p>
      </div>
      <div className="flex flex-col py-7 gap-1 border-y-[1px] border-border">
        <InfoLine
          title="Products price:"
          value={`${cart.totalAmount} MDL`}
          icon={<BadgeCent size={24} />}
        />
        <InfoLine
          title="In Cart:"
          value={`${cart.cartTotal} item${cart.cartTotal > 1 ? 's' : ''}.`}
          icon={<ShoppingBag size={24} />}
        />
        <InfoLine
          title="Delivery:"
          value={DeliveryPrice === 0 ? 'Free' : `${DeliveryPrice} MDL`}
          icon={<Truck size={24} />}
        />
      </div>
      {children}
    </EntityBlock>
  );
};
