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
        setTimeout(onComplete, 200);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Staggered reveal: M -> S -> R
    const t1 = setTimeout(() => setLetterStep(1), 100);
    const t2 = setTimeout(() => setLetterStep(2), 240);
    const t3 = setTimeout(() => setLetterStep(3), 380);

    // Fade out and complete
    const exitTimer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onComplete, 350);
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFF8F3] transition-opacity duration-300 ease-out select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading MSR Portfolio"
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#FCE9DF] opacity-80 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Central Initials Container */}
        <div className="relative z-10 flex items-center tracking-tight">
          {/* Letter M */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#613E35] inline-block transition-all duration-300 ease-out transform ${
              letterStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            M
          </span>

          {/* Letter S */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#613E35] inline-block transition-all duration-300 ease-out transform ${
              letterStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            S
          </span>

          {/* Letter R with Blue Accent Dot */}
          <span 
            className={`font-semibold text-5xl sm:text-6xl md:text-7xl text-[#613E35] inline-block relative transition-all duration-300 ease-out transform ${
              letterStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            R
            {/* Blue Accent Dot */}
            <span 
              className={`absolute -right-3 bottom-2.5 w-2.5 h-2.5 rounded-full bg-[#D98C70] transition-all duration-200 ${
                letterStep >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
          </span>
        </div>

        {/* Subtitle */}
        <div 
          className={`mt-3 text-xs tracking-widest uppercase font-medium text-[#A27B6E] transition-opacity duration-300 ${
            letterStep >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Marthala Surendar Reddy
        </div>

        {/* Micro Loading Progress Line */}
        <div className="w-24 h-0.5 bg-[#F0DED4] rounded-full overflow-hidden mt-4">
          <div 
            className={`h-full bg-[#D98C70] rounded-full transition-all duration-700 ease-out ${
              letterStep >= 3 ? 'w-full' : letterStep >= 2 ? 'w-2/3' : letterStep >= 1 ? 'w-1/3' : 'w-0'
            }`}
          />
        </div>

      </div>
    </div>
  );
};
