'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button, NavLink, Skeleton } from '@/components/shared';
import { Logout } from '@/app/(root)/profile/logoutAction';

import { queryClient } from '@/utils';
import { useAppDispatch, useSession } from '@/utils/hooks';
import { queryKeys, ROUTES } from '@/utils/consts';
import { LOGOUT } from '@/redux/global';
import { LogOut } from 'lucide-react';
import { ProfileShortInfo } from '@/components/features';

export const ProfileNav = () => {
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
    //65px header(border bottom 1px) +16px(pl+pr) +80px(footer) = 161 min-h-[calc(100vh-161px)]
    <div className="px-4 flex flex-col gap-5 sm:border-r border-border min-w-60 w-full sm:w-1/5">
      <ProfileShortInfo user={user} />
      <nav className="grow">
        <ul className="flex flex-col gap-1">
          <li>
            <NavLink href={ROUTES.PROFILE_PERSONAL}>Personal data</NavLink>
          </li>
          <li>
            <NavLink href="#">Orders</NavLink>
          </li>
          <li>
            <NavLink href="#">My addresses</NavLink>
          </li>
          <li>
            <NavLink href="#">My favorite</NavLink>
          </li>
          <li>
            <NavLink href="#">My comments</NavLink>
          </li>
        </ul>
      </nav>
      <div className="pt-2 border-t border-border">
        {user ? (
          <Button
            size="full"
            aria-label="logout"
            version="contain"
            onClick={() => logoutHandler()}
            className="gap-2"
          >
            <LogOut size={20} />
            Logout
          </Button>
        ) : (
          <Skeleton
            width="100%"
            height="42px"
            borderRadius="42px"
          />
        )}
      </div>
    </div>
  );
};
