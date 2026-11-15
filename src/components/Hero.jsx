import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Code2, Mail, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Hero = () => {
  const { data } = useData();
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  const profile = data.profile || {};
  const social = data.social || {};

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setShowScrollArrow(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { name: "LinkedIn", url: social.linkedin || "https://www.linkedin.com/in/marthalasurendarreddy/", icon: Linkedin },
    { name: "GitHub", url: social.github || "https://github.com/SURENDAR30392", icon: Github },
    { name: "LeetCode", url: social.leetcode || "https://leetcode.com/u/kl_2400030392/", icon: Code2 },
    { name: "Email", url: `mailto:${social.email || "marthalasurendarreddy@gmail.com"}`, icon: Mail }
  ];

  return (
    <section 
      id="hero" 
      className="bg-[#F7FAFA] w-full flex flex-col justify-center relative pt-12 pb-16 lg:py-0 lg:h-[min(calc(100vh-64px),760px)] lg:min-h-[640px] animate-fade-in"
    >
      <div className="max-w-[1100px] w-full mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-[64px]">
          
          {/* Left Column */}
          <div className="w-full lg:max-w-[560px] flex flex-col items-start justify-center">
            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 mb-[12px]">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" aria-hidden="true" />
              <span className="text-[14px] text-[#4B5F5C] font-medium">Available for work & internships</span>
            </div>

            {/* Name */}
            <h1 className="text-[32px] sm:text-[46px] lg:text-[56px] font-semibold text-[#102A28] leading-[1.1] tracking-[-0.02em] mb-[12px] break-words">
              {profile.name || "Marthala Surendar Reddy"}
            </h1>

            {/* Title / Role */}
            <p className="text-[18px] sm:text-[20px] font-normal text-[#0F766E] leading-[1.3] mb-[16px]">
              {profile.title || "B.Tech Computer Science and Engineering Student"}
            </p>

            {/* University & Bio Summary */}
            <p className="text-[16px] sm:text-[17px] text-[#4B5F5C] leading-[1.6] max-w-[480px] mb-[32px]">
              {profile.intro || "Undergraduate student at KL University (Expected 2028). Specialized in Java backend architectures, data structures & algorithms, and full-stack web engineering."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-[24px]">
              <a href="#work" className="btn-primary">
                View my work
              </a>
              <a href="#contact" className="btn-secondary">
                Contact me
              </a>
            </div>

            {/* Social Links with Tooltips */}
            <div className="flex items-center gap-[8px]">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[#4B5F5C] hover:text-[#0F766E] hover:bg-[#E6F4F2] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD]"
                    >
                      <Icon size={20} />
                    </a>
                    <span 
                      role="tooltip" 
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[11px] font-medium text-white bg-[#102A28] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-sm z-20"
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Portrait Frame */}
          <div className="w-full lg:max-w-[520px] flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[520px] h-[360px] sm:h-[480px] lg:h-[600px] bg-[#E6F4F2] rounded-[20px] overflow-hidden flex items-end justify-center select-none border border-[#DDE7E5]/50 shadow-sm relative group">
              <img 
                src={profile.avatar || "/msr-portrait.svg"} 
                alt={profile.name || "Marthala Surendar Reddy"}
                className="w-full h-full object-contain object-bottom pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <div 
        className={`hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-300 pointer-events-none ${
          showScrollArrow ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <ChevronDown size={18} className="text-[#8A9B98] animate-bounce" />
      </div>
    </section>
  );
};

