import React, { useEffect, useState } from 'react';

export const MSRLoader = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const displayDuration = prefersReducedMotion ? 600 : 1200;

    const timer = setTimeout(() => {
      setFadingOut(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(exitTimer);
    }, displayDuration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7FAFA] transition-opacity duration-300 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading MSR Portfolio"
    >
      <div className="flex flex-col items-center justify-center select-none">
        <div className="relative flex items-center justify-center">
          <span className="font-semibold text-5xl sm:text-6xl md:text-7xl text-[#102A28] tracking-tight transition-transform duration-700 ease-out transform scale-100 animate-pulse">
            MSR
          </span>
          <span 
            className="absolute -right-3.5 bottom-2.5 w-2.5 h-2.5 rounded-full bg-[#0F766E]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
