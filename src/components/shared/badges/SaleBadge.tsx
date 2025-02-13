interface IProps {
  price: number;
  oldPrice: number;
}

export const SaleBadge = ({ price, oldPrice }: IProps) => {
  const Percentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  return (
    <div className="w-fit py-[1px] px-[2px] typo-body-14 rounded-md bg-success text-white">
      {Percentage}%
    </div>
  );
};
