interface IProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Container = ({ children, style = {} }: IProps) => {
  return (
    <div
      style={style}
      className="mx-auto max-w-custom-xl w-full px-[4px] sm:px-[8px] lg:px-[16px]"
    >
      {children}
    </div>
  );
};
