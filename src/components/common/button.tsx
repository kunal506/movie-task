import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-16 px-7 rounded-[10px] font-bold text-body-regular z-10 btn-${variant} ${className} ${
        disabled ? 'btn-disabled' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
