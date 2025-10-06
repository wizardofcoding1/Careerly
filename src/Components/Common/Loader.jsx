import React from 'react';

export default function Loader({ size = 'medium', color = 'blue' }) {
  // Size classes
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  // Color classes
  const colorClasses = {
    blue: 'border-blue-600',
    red: 'border-red-600',
    green: 'border-green-600',
    purple: 'border-purple-600'
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}