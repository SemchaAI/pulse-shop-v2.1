import { Button, Skeleton } from '@/components/shared';
import { IUserSession } from '@/models/auth';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  user: IUserSession | null;
}

export const ProfileShortInfo = ({ user }: IProps) => {
  return (
    <div className="relative flex items-center gap-2 py-2 border-b border-border">
      {user ? (
        <>
          <Image
            className="rounded-full border-2 border-border"
            src={user.avatar || '/images/noImage.webp'}
            alt={user.name}
            width={100}
            height={100}
            priority
          />
          <div>
            <p className="text-text-highlight">{user.name}</p>
            <p>Role: {user.role}</p>
          </div>
          <Button
            version="outline"
            icon
            aria-label="edit avatar"
            className="absolute bottom-1 left-16 bg-white"
          >
            <Pencil size={20} />
          </Button>
        </>
      ) : (
        <>
          <Skeleton
            width="100px"
            height="100px"
            borderRadius="100%"
          />
          <div className="flex flex-col gap-1">
            <Skeleton
              width="60px"
              height="20px"
              borderRadius="10px"
            />
            <Skeleton
              width="80px"
              height="20px"
              borderRadius="10px"
            />
          </div>
          <Button
            version="outline"
            icon
            aria-label="edit avatar"
            className="absolute bottom-1 left-16 bg-white"
          >
            <Pencil size={20} />
          </Button>
        </>
      )}
    </div>
  );
};
