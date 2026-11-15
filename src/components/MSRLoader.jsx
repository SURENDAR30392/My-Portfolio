import React, { useEffect, useState } from 'react';

export const MSRLoader = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [letterStep, setLetterStep] = useState(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setLetterStep(3);
      const timer = setTimeout(() => {
        setFadingOut(true);
        setTimeout(onComplete, 250);
      }, 600);
      return () => clearTimeout(timer);
    }

    // Staggered letter reveal: M -> S -> R
    const t1 = setTimeout(() => setLetterStep(1), 120);
    const t2 = setTimeout(() => setLetterStep(2), 280);
    const t3 = setTimeout(() => setLetterStep(3), 440);

    // Total display time: approximately 1.25s
    const exitTimer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onComplete, 400);
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7FAFA] transition-all duration-400 ease-out select-none ${
        fadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="status"
      aria-label="Loading MSR Portfolio"
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Subtle Ambient Radial Aura behind MSR */}
        <div 
          className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#E6F4F2] opacity-70 blur-2xl pointer-events-none animate-pulse"
          style={{ animationDuration: '2s' }}
          aria-hidden="true"
        />

        {/* Central Initials Container */}
        <div className="relative z-10 flex items-center tracking-tight">
          
          {/* Letter M */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#102A28] inline-block transition-all duration-350 ease-out transform ${
              letterStep >= 1 
                ? 'opacity-100 translate-y-0 filter-none' 
                : 'opacity-0 translate-y-3 blur-xs'
            }`}
          >
            M
          </span>

          {/* Letter S */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#102A28] inline-block transition-all duration-350 ease-out transform ${
              letterStep >= 2 
                ? 'opacity-100 translate-y-0 filter-none' 
                : 'opacity-0 translate-y-3 blur-xs'
            }`}
          >
            S
          </span>

          {/* Letter R with Teal Accent Dot */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#102A28] inline-block relative transition-all duration-350 ease-out transform ${
              letterStep >= 3 
                ? 'opacity-100 translate-y-0 filter-none' 
                : 'opacity-0 translate-y-3 blur-xs'
            }`}
          >
            R
            {/* Elegant Accent Dot */}
            <span 
              className={`absolute -right-3 bottom-2.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#0F766E] transition-all duration-300 ${
                letterStep >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
          </span>

        </div>

        {/* Premium Animated Line & Indicator below MSR */}
        <div className="relative mt-5 w-28 sm:w-36 h-[2.5px] bg-[#DDE7E5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0F766E] rounded-full transition-all duration-1000 ease-out"
            style={{
              width: letterStep === 0 ? '0%' : letterStep === 1 ? '35%' : letterStep === 2 ? '70%' : '100%'
            }}
          />
        </div>

      </div>
    </div>
  );
};
