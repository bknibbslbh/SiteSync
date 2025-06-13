import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '', 
    id, 
    ...rest 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const widthClass = fullWidth ? 'w-full' : '';
    
    const getTextareaClasses = () => {
      const baseClasses = 'block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-colors duration-200';
      const errorClasses = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';
      
      return `${baseClasses} ${errorClasses} ${className}`;
    };

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={getTextareaClasses()}
          {...rest}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;