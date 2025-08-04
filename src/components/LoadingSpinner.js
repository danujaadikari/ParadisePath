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
    primary: 'border-primary-600 dark:border-primary-400',
    secondary: 'border-secondary-600 dark:border-secondary-400',
    white: 'border-white',
    gray: 'border-gray-600 dark:border-gray-400'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`
            ${sizeClasses[size]} 
            border-4 border-gray-200 dark:border-gray-700
            ${colorClasses[color]} 
            border-t-transparent 
            rounded-full 
            animate-spin
          `}
          role="status"
          aria-label="Loading"
        />
        
        {/* Inner ring */}
        <div 
          className={`
            absolute top-1 left-1
            ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-12 h-12'}
            border-2 border-gray-100 dark:border-gray-600
            ${color === 'primary' ? 'border-t-primary-400 dark:border-t-primary-300' : 
              color === 'secondary' ? 'border-t-secondary-400 dark:border-t-secondary-300' : 
              color === 'white' ? 'border-t-gray-300' : 'border-t-gray-500'}
            border-t-transparent 
            rounded-full 
            animate-spin
            animation-delay-75
          `}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
