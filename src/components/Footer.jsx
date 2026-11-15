import React from 'react';
import { Linkedin, Github, Code2, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Footer = () => {
  const { data } = useData();
  const profile = data.profile || {};
  const social = data.social || {};

  const socialLinks = [
    { name: "LinkedIn", url: social.linkedin || "https://www.linkedin.com/in/marthalasurendarreddy/", icon: Linkedin },
    { name: "GitHub", url: social.github || "https://github.com/SURENDAR30392", icon: Github },
    { name: "LeetCode", url: social.leetcode || "https://leetcode.com/u/kl_2400030392/", icon: Code2 },
    { name: "Email", url: `mailto:${social.email || "marthalasurendarreddy@gmail.com"}`, icon: Mail }
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

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
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
