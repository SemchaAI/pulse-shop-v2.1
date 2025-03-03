import { userData } from '@/app/actions';
import { CheckoutSection } from '@/components/widgets';

export default async function Checkout() {
  const user = await userData();
  return <CheckoutSection user={user} />;
}
