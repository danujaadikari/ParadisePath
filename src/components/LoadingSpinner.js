import React from 'react';

/**
 * Loading spinner component
 * Features: Customizable size and color, accessible design
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          border-4 border-gray-200 
          ${colorClasses[color]} 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
