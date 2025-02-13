interface IProps {
  totalItems: number;
}

export const CountBadge = ({ totalItems = 0 }: IProps) => {
  return (
    <div
      className={`absolute -top-1 -right-2 flex items-center justify-center rounded-full bg-primary text-black-01 text-xs animate-scale border border-success animate-bounce once
      ${totalItems > 9 ? 'w-[18px] h-[18px]' : 'w-4 h-4'}`}
    >
      {totalItems > 9 ? '9+' : totalItems}
    </div>
  );
};
