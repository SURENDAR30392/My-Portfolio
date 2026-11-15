import React from 'react';
import { Linkedin, Github, Code2, Mail } from 'lucide-react';
import { CodeChefIcon } from './icons/CodeChefIcon';
import { useData } from '../context/DataContext';
import { DEFAULT_SOCIAL_LINKS } from '../data/socialLinks';

export const Footer = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const socialLinks = [
    { 
      name: "LinkedIn", 
      url: social.linkedin || DEFAULT_SOCIAL_LINKS.linkedin, 
      icon: Linkedin,
      label: "LinkedIn Profile"
    },
    { 
      name: "GitHub", 
      url: social.github || DEFAULT_SOCIAL_LINKS.github, 
      icon: Github,
      label: "GitHub Profile"
    },
    { 
      name: "LeetCode", 
      url: social.leetcode || DEFAULT_SOCIAL_LINKS.leetcode, 
      icon: Code2,
      label: "LeetCode Profile"
    },
    { 
      name: "CodeChef", 
      url: social.codechef || DEFAULT_SOCIAL_LINKS.codechef, 
      icon: CodeChefIcon,
      label: "CodeChef Profile"
    },
    { 
      name: "Email", 
      url: `mailto:${social.email || profile.email || DEFAULT_SOCIAL_LINKS.email}`, 
      icon: Mail,
      label: "Email Marthala Surendar Reddy"
    }
  ];

  return (
    <footer className="bg-[#EEF4F3] border-t border-[#DDE7E5] py-12">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Branding & Title */}
        <div>
          <div className="text-base font-semibold text-[#102A28]">
            {profile.name || "Marthala Surendar Reddy"}
          </div>
          <p className="text-sm text-[#4B5F5C] mt-0.5">
            B.Tech Computer Science & Engineering · KL University
          </p>
        </div>

        {/* Social Icons - Strictly mapped to each platform */}
        <div className="flex flex-wrap items-center gap-2.5">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            const isMail = item.url.startsWith('mailto:');
            return (
              <a
                key={item.name}
                href={item.url}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={item.label}
                title={item.name}
                className="w-10 h-10 rounded-lg border border-[#DDE7E5] bg-[#FFFFFF] hover:bg-[#E6F4F2] text-[#4B5F5C] hover:text-[#0F766E] flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CC7BD]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#8A9B98] sm:text-right">
          © {new Date().getFullYear()} {profile.name || "Marthala Surendar Reddy"}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
