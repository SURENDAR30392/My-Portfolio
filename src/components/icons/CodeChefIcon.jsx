import React from 'react';

export const CodeChefIcon = ({ size = 20, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Chef Hat outline */}
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      {/* Brim line */}
      <line x1="6" y1="17" x2="18" y2="17" />
      {/* Code bracket symbol in hat */}
      <path d="m10 10-1.5 1.5 1.5 1.5" />
      <path d="m14 10 1.5 1.5-1.5 1.5" />
    </svg>
  );
};
