import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  value?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '', 
    id, 
    ...rest 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    const widthClass = fullWidth ? 'w-full' : '';
    
    const getSelectClasses = () => {
      const baseClasses = 'block rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-colors duration-200';
      const errorClasses = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';
      
      return `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
    };

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={getSelectClasses()}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';

export default Select;