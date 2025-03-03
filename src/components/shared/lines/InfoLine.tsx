interface IProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  value: string | React.ReactNode;
}

export const InfoLine = ({ title, value, icon, className }: IProps) => {
  return (
    <div className={`h-6 flex items-center relative ${className || ''}`}>
      <span className="flex items-center gap-1.5">
        {icon}
        {title}
      </span>
      <div className="flex-grow h-[calc(100%-6px)] border-b border-dashed border-border mx-2 relative" />
      <span className="font-bold">{value}</span>
    </div>
  );
};
