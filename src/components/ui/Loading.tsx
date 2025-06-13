import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-600';
      case 'secondary':
        return 'text-secondary-600';
      case 'white':
        return 'text-white';
      default:
        return 'text-primary-600';
    }
  };

  const spinner = (
    <div className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${getSizeClass()} ${getColorClass()}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center">
          {spinner}
          {text && <p className="mt-4 text-white font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex flex-col items-center justify-center">
        {spinner}
        <p className="mt-2 text-gray-700 font-medium">{text}</p>
      </div>
    );
  }

  return spinner;
};

export default Loading;