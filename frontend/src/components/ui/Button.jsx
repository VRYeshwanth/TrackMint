import React from 'react';

export const Button = ({ children, variant = 'primary', rounded = 'md', className = '', ...props }) => {
  const baseStyle = `px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${rounded === 'full' ? 'rounded-full' : 'rounded-md'}`;
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 border border-gray-300",
    outline: "border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    "outline-danger": "border-2 border-red-200 text-red-600 hover:bg-red-50 focus:ring-red-500"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
