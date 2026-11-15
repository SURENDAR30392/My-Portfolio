import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Code2, Mail, ArrowRight, Download } from 'lucide-react';
import { CodeChefIcon } from './icons/CodeChefIcon';
import { useData } from '../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../data/socialLinks';

export const Hero = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  // Strict independent social links mapping
  const socialLinks = [
    { 
      name: "LinkedIn", 
      url: social.linkedin || DEFAULT_SOCIAL_LINKS.linkedin, 
      icon: Linkedin,
      label: "View Marthala Surendar Reddy on LinkedIn"
    },
    { 
      name: "GitHub", 
      url: social.github || DEFAULT_SOCIAL_LINKS.github, 
      icon: Github,
      label: "View SURENDAR30392 on GitHub"
    },
    { 
      name: "LeetCode", 
      url: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode, 
      icon: Code2,
      label: "View kl_2400030392 on LeetCode"
    },
    { 
      name: "CodeChef", 
      url: social.codechef || DEFAULT_SOCIAL_LINKS.codechef, 
      icon: CodeChefIcon,
      label: "View kl2400030392 on CodeChef"
    },
    { 
      name: "Email", 
      url: `mailto:${social.email || profile.email || DEFAULT_SOCIAL_LINKS.email}`, 
      icon: Mail,
      label: "Send Email to Marthala Surendar Reddy"
    }
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.history.pushState(null, '', `#${id}`);
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className="bg-[#FFF8F3] w-full flex flex-col justify-center relative pt-12 pb-16 lg:py-16 animate-fade-in border-b border-[#F0DED4]"
    >
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Identity & Actions */}
          <div className="w-full lg:max-w-[620px] flex flex-col items-start justify-center">
            
            {/* Status Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#F0DED4] shadow-xs mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-xs text-[#613E35] font-medium tracking-tight">
                Available for internships & software engineering roles
              </span>
            </div>

            {/* Candidate Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#613E35] leading-[1.12] tracking-tight mb-3">
              {profile.name || "Marthala Surendar Reddy"}
            </h1>

            {/* Professional Role & Affiliation */}
            <p className="text-lg sm:text-xl font-medium text-[#613E35] leading-snug mb-4">
              {profile.title || "B.Tech Computer Science and Engineering Student"} · KL University
            </p>

            {/* Narrative Tagline / Summary */}
            <p className="text-base sm:text-[17px] text-[#613E35] leading-relaxed max-w-[540px] mb-8">
              {profile.intro || "B.Tech CSE student at KL University specializing in core Java backend systems, data structures & algorithms, and modern full-stack web platforms."}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a 
                href="#work" 
                onClick={(e) => handleScrollTo(e, 'work')} 
                className="btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleScrollTo(e, 'contact')} 
                className="btn-secondary"
              >
                <span>Get in Touch</span>
              </a>
              <a 
                href="/resume" 
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#613E35] hover:text-[#D98C70] px-3 py-2 rounded-lg transition-colors"
              >
                <Download size={15} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social & Coding Platform Links */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#613E35] mb-2.5">
                Connect & Verify
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  const isMail = item.url.startsWith('mailto:');
                  return (
                    <div key={item.name} className="relative group">
                      <a
                        href={item.url}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noopener noreferrer"}
                        aria-label={item.label}
                        className="w-10 h-10 rounded-lg bg-white border border-[#F0DED4] shadow-xs flex items-center justify-center text-[#613E35] hover:text-[#D98C70] hover:bg-[#FCE9DF] hover:border-[#F4C9B5] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70]"
                      >
                        <Icon size={18} />
                      </a>
                      <span 
                        role="tooltip" 
                        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[11px] font-medium text-white bg-[#613E35] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-sm z-20"
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait Frame */}
          <div className="w-full lg:max-w-[480px] flex justify-center items-center">
            <div className="w-full max-w-[440px] h-[360px] sm:h-[460px] lg:h-[520px] bg-gradient-to-b from-[#FCE9DF] to-white rounded-2xl overflow-hidden flex items-end justify-center select-none border border-[#F0DED4] shadow-card relative group">
              
              {/* Subtle Blue Glow in frame background */}
              <div 
                className="absolute inset-0 bg-radial from-[#F4C9B5]/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Portrait Image */}
              <img 
                src={profile.avatar || "/msr-portrait.svg"} 
                alt={profile.name || "Marthala Surendar Reddy"}
                className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] relative z-10"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/msr-portrait.svg";
                }}
              />

              {/* Verified Student Badge Overlay */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-[#F0DED4] rounded-lg px-2.5 py-1 text-[11px] font-semibold text-[#613E35] shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D98C70]" />
                <span>KL University · 2028</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
