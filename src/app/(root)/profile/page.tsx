'use client';
import toast from 'react-hot-toast';

import { Button, Container } from '@/components/shared';

import { Logout } from './logoutAction';

import { queryClient } from '@/utils';
import { useSession } from '@/utils/hooks';
import { queryKeys } from '@/utils/consts';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { data } = useSession();
  const logoutHandler = async () => {
    try {
      const res = await Logout();
      if (!res) return;
      queryClient.setQueryData(queryKeys.session, null);
      toast.success('Logout successful');
      router.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <section>
      <Container>
        <h2>Profile</h2>
        {data && (
          <div>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.role}</p>
          </div>
        )}
        <Button
          version="contain"
          onClick={() => logoutHandler()}
        >
          Logout
        </Button>
      </Container>
    </section>
  );
}
