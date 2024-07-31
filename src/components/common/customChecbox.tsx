'use client';
import React, { FC } from 'react';

interface CustomCheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <label className="flex items-center space-x-8 cursor-pointer">
      <div
        className={`w-[18px] h-[18px] border rounded-[5px] bg-input z-10 ${
          isChecked ? 'border-white' : 'border-input'
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange();
        }}
      >
        {isChecked && (
          <svg
            className="w-full h-full text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 4.707 7.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-body-regular font-regular text-white">{label}</span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

export default CustomCheckbox;
