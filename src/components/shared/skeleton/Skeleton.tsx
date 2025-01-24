interface IProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}
export const Skeleton = ({
  width = '100%',
  height = 'auto',
  borderRadius = '0',
}: IProps) => {
  return (
    <div
      className="animate-pulse bg-action-disabled"
      style={{ width, height, borderRadius }}
    ></div>
  );
};
