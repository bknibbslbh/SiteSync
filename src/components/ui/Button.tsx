import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500';
      case 'secondary':
        return 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500';
      case 'success':
        return 'bg-success-500 hover:bg-success-700 text-white focus:ring-success-500';
      case 'danger':
        return 'bg-error-500 hover:bg-error-700 text-white focus:ring-error-500';
      case 'warning':
        return 'bg-warning-500 hover:bg-warning-700 text-white focus:ring-warning-500';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'md':
        return 'py-2 px-4 text-base';
      case 'lg':
        return 'py-2.5 px-5 text-lg';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;