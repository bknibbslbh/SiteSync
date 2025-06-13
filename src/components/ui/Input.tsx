import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    className = '', 
    id, 
    ...rest 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const widthClass = fullWidth ? 'w-full' : '';
    
    const getInputClasses = () => {
      const baseClasses = 'block rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-colors duration-200';
      const errorClasses = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';
      const paddingClasses = leftIcon ? 'pl-10' : '';
      
      return `${baseClasses} ${errorClasses} ${paddingClasses} ${widthClass} ${className}`;
    };

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={getInputClasses()}
            {...rest}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-1">
            {error && <p className="text-error-500 text-sm">{error}</p>}
            {!error && helperText && <p className="text-gray-500 text-sm">{helperText}</p>}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;