import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Code2, Mail, ShieldCheck } from 'lucide-react';
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
    <footer className="bg-[#FFF8F3] border-t border-[#F0DED4] py-12 transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#F0DED4]">
          
          {/* Identity & Department */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#FCE9DF] border border-[#F4C9B5] text-[#613E35] font-bold text-xs flex items-center justify-center tracking-tight shadow-xs">
              MSR
            </span>
            <div>
              <div className="text-base font-bold text-[#613E35]">
                {profile.name || "Marthala Surendar Reddy"}
              </div>
              <p className="text-xs text-[#613E35] mt-0.5">
                B.Tech Computer Science & Engineering · KL University
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center gap-2">
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
                  className="w-9 h-9 rounded-lg border border-[#F0DED4] bg-white hover:bg-[#FCE9DF] hover:border-[#F4C9B5] text-[#613E35] hover:text-[#D98C70] flex items-center justify-center transition-all duration-150 shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D98C70]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#613E35]">
          <div>
            © {new Date().getFullYear()} {profile.name || "Marthala Surendar Reddy"}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/resume" 
              className="text-[#613E35] hover:text-[#D98C70] transition-colors"
            >
              Resume PDF
            </Link>
            <span>•</span>
            <Link 
              to="/honors" 
              className="text-[#613E35] hover:text-[#D98C70] transition-colors"
            >
              Honors & Certifications
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
