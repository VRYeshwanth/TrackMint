import React from 'react';

export const Input = ({ label, id, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={id}
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};
