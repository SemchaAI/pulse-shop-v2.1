interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  version?: 'text' | 'outline' | 'contain';
  size?: 'default' | 'full';
  icon?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

export const Button = ({
  version = 'text',
  size = 'default',
  icon = false,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...props
}: IProps) => {
  const sizeClass = {
    default: '',
    full: 'w-full',
  };
  const versionClass = {
    text: 'bg-transparent hover:bg-border focus:bg-border focus:text-text-primary hover:text-text-primary',
    outline: `text-secondary border-solid border-secondary bg-transparent hover:bg-primary hover:text-black-01 hover:border-primary focus:bg-primary focus:text-black-01 focus:border-primary`,
    contain:
      'text-black-01 bg-primary border border-solid border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary  focus:bg-transparent focus:border-secondary focus:text-secondary',
  };

  const btnClass = `
  flex items-center justify-center text-center transition-colors duration-300 ease-in-out border rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed
  ${sizeClass[size]} ${versionClass[version]} 
  ${icon ? 'p-2' : 'px-4 py-2'} ${className}`;
  return (
    <button
      className={btnClass}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
