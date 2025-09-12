import React from 'react';

/**
 * Enhanced loading spinner component with modern animations
 * Features: Multiple variants, customizable size and color, glassmorphism effects
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  variant = 'modern',
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
    primary: 'border-green-600 dark:border-green-400',
    secondary: 'border-emerald-600 dark:border-emerald-400',
    white: 'border-white',
    gray: 'border-gray-600 dark:border-gray-400'
  };

  if (variant === 'modern') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
        <div className="relative">
          {/* Outer ring with enhanced styling */}
          <div 
            className={`
              ${sizeClasses[size]} 
              border-4 border-gray-200/30 dark:border-gray-700/30
              border-t-green-600 dark:border-t-green-400
              rounded-full 
              animate-spin
              shadow-lg
            `}
            role="status"
            aria-label="Loading"
          />
          
          {/* Inner ring with opposite rotation */}
          <div 
            className={`
              absolute top-1 left-1
              ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-12 h-12'}
              border-2 border-gray-100/50 dark:border-gray-600/50
              border-b-emerald-500 dark:border-b-emerald-400
              rounded-full 
              animate-spin
              shadow-md
            `}
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          />
          
          {/* Center pulsing dot */}
          <div 
            className={`
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              ${size === 'small' ? 'w-1 h-1' : size === 'medium' ? 'w-2 h-2' : size === 'large' ? 'w-3 h-3' : 'w-4 h-4'}
              bg-gradient-to-r from-green-500 to-emerald-500
              rounded-full 
              animate-pulse-glow
            `}
          />
        </div>
        
        {text && (
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }

  // Skeleton loader variant
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-4 animate-pulse ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Default variant (fallback)
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="relative">
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
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
