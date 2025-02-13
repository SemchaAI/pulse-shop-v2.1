interface IProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}
export const Skeleton = ({
  width = '100%',
  height = 'auto',
  borderRadius = '0',
  className,
}: IProps) => {
  return (
    <div
      className={`animate-pulse bg-action-disabled ${
        className ? className : ''
      }`}
      style={{ width, height, borderRadius }}
    ></div>
  );
};
