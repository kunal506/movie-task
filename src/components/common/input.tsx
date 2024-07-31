'use client';
import { cn } from '@/lib/utils';
import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}

const Input: FC<InputProps> = ({
  placeholder,
  name,
  value,
  error,
  type = 'text',
  onChange,
  className = '',
  autoFocus = false,
  autoComplete = 'off',
  ...rest
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'rounded-[10px] bg-input py-2.5 px-16 outline-none w-full border text-white focus:bg-white z-10',
          error ? 'border-error text-error' : 'border-input focus:text-input',
          className
        )}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        {...rest}
      />
      {error && (
        <p className="text-error mt-2 text-left text-body-extra-small !opacity-100">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
