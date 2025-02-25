//mb in future z-index control
interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Overlay = ({ children, onClick }: IProps) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black/50`}
    >
      {children}
    </div>
  );
};
