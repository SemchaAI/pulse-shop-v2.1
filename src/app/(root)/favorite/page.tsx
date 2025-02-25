import { Container } from '@/components/shared';
import { FavoriteProducts } from './getFavorites';
import { getServerSession } from '@/utils/helpers';
import { redirect } from 'next/navigation';

export default async function Favorite() {
  const { user, status, message } = await getServerSession();
  if (user && user.role === 'GUEST')
    return redirect(`/?toastMessage=${message}`);

  if (!user && status === 200) return redirect(`/?toastMessage=${message}`);
  return (
    <div className="flex grow">
      <Container>
        <FavoriteProducts />
      </Container>
    </div>
  );
}
