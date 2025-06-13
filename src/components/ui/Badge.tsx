import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-100 text-primary-800';
      case 'secondary':
        return 'bg-secondary-100 text-secondary-800';
      case 'success':
        return 'bg-success-50 text-success-700';
      case 'error':
        return 'bg-error-50 text-error-700';
      case 'warning':
        return 'bg-warning-50 text-warning-700';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'md':
        return 'text-sm px-2.5 py-0.5';
      case 'lg':
        return 'text-base px-3 py-1';
      default:
        return 'text-sm px-2.5 py-0.5';
    }
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded';

  return (
    <span className={`inline-flex items-center font-medium ${getVariantClasses()} ${getSizeClasses()} ${roundedClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;