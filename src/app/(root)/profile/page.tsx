'use client';
import toast from 'react-hot-toast';

import { Button, Container } from '@/components/shared';

import { Logout } from './logoutAction';

import { queryClient } from '@/utils';
import { useAppDispatch, useSession } from '@/utils/hooks';
import { queryKeys } from '@/utils/consts';
import { useRouter } from 'next/navigation';
import { LOGOUT } from '@/redux/global';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: user } = useSession();
  const logoutHandler = async () => {
    try {
      const res = await Logout();
      if (!res) return;
      queryClient.setQueryData([queryKeys.session], null);
      dispatch(LOGOUT());
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
        {user && (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        )}
        <Button
          aria-label="logout"
          version="contain"
          onClick={() => logoutHandler()}
        >
          Logout
        </Button>
      </Container>
    </section>
  );
}
