interface IProps {
  children: React.ReactNode;
}

export const StateContainer = ({ children }: IProps) => {
  return (
    <div className="flex grow justify-center items-center gap-2 h-full text-primary typo-title-24">
      {children}
    </div>
  );
};
