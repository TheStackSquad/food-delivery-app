import React from 'react';

// Reusable Card Components
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="border-b px-4 py-2">{children}</div>;
};

export const CardTitle = ({ children, className }) => {
  return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
};

export const CardContent = ({ children }) => {
  return <div className="px-4 py-2">{children}</div>;
};
