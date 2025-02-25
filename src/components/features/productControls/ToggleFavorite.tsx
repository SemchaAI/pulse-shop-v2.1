'use client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

import { Button } from '@/components/shared';

import { queryKeys } from '@/utils/consts';
import { addToFavorite } from '@/utils/api/http/favoriteApi';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { initFavorite } from '@/redux/favorite';

interface IProps {
  id: number;
  version?: 'outline' | 'contain';

  text?: string;
  className?: string;
}

export const ToggleFavorite = ({
  id,
  version = 'contain',
  className,
  text,
}: IProps) => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.favorite.favoriteProducts);
  const isFavorite = favorite.some((item) => item === id);

  const { mutate: mutateFavorite, isPending: isPendingFavorite } = useMutation({
    mutationKey: [queryKeys.session, queryKeys.toggleFavoriteItem],
    mutationFn: () => addToFavorite(id),
    onSuccess: (data) => {
      dispatch(
        initFavorite({
          favoriteProducts: data.favoriteProducts, //tmp
        })
      );
      toast.success(`${data.message}`);
    },
    onError: () => {
      toast.error('Failed to add item to favorite');
    },
  });

  return (
    <Button
      icon
      version={version}
      aria-label="Add to favorite"
      disabled={isPendingFavorite}
      onClick={mutateFavorite}
      className={`gap-1 ${className ? className : ''}`}
    >
      <Heart
        size={24}
        stroke={isFavorite ? 'var(--text-error)' : 'var(--black-01)'}
        fill={isFavorite ? 'var(--text-error)' : 'transparent'}
      />
      {text}
    </Button>
  );
};
