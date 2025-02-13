interface IProps {
  className?: string;
  children: React.ReactNode;
}

export const EntityBlock = ({ className, children }: IProps) => {
  return (
    <div
      className={`shadow-sm bg-foreground rounded-2xl p-4 border border-border ${className}`}
    >
      {children}
    </div>
  );
};
