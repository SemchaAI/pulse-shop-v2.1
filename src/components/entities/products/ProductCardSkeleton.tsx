import { Skeleton } from '@/components/shared';

export const ProductCardSkeleton = () => {
  return (
    <li className="h-full flex flex-col p-4 justify-between relative bg-foreground border border-border rounded-lg overflow-hidden">
      <div>
        <Skeleton
          width="100%"
          height="200px"
          borderRadius="5px"
        />
        <Skeleton
          className="mt-2"
          width="100%"
          height="16px"
          borderRadius="5px"
        />
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="w-full flex justify-between mt-2">
          <Skeleton
            width="52px"
            height="16px"
            borderRadius="5px"
          />
          <Skeleton
            width="90px"
            height="16px"
            borderRadius="5px"
          />
        </div>
        <div className="w-full flex flex-col justify-end h-12">
          <div className="flex gap-1 items-center">
            <Skeleton
              width="32px"
              height="22px"
              borderRadius="5px"
            />
            <Skeleton
              width="70px"
              height="20px"
              borderRadius="5px"
            />
          </div>
          <Skeleton
            width="70%"
            height="16px"
            borderRadius="5px"
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        <Skeleton
          className="grow"
          width="auto"
          height="42px"
          borderRadius="999px"
        />
        <Skeleton
          width="42px"
          height="42px"
          borderRadius="999px"
        />
      </div>
    </li>
  );
};
